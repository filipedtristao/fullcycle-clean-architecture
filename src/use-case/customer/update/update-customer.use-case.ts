import Address from "../../../domain/customer/entity/address";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer.repository.interface";
import { UpdateCustomerDtoInput, UpdateCustomerDtoOutput } from "./update-customer.dto";

export default class UpdateCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) { }

    async execute(input: UpdateCustomerDtoInput): Promise<UpdateCustomerDtoOutput> {
        const customer = await this.customerRepository.findById(input.id);
        const newAddress = new Address(input.address.street, input.address.number, input.address.city, input.address.state, input.address.zip);

        customer.changeName(input.name);
        customer.changeAddress(newAddress);

        await this.customerRepository.update(customer);

        return {
            id: customer.getId(),
            name: customer.getName(),
            address: {
                street: customer.getAddress().getStreet(),
                number: customer.getAddress().getNumber(),
                city: customer.getAddress().getCity(),
                state: customer.getAddress().getState(),
                zip: customer.getAddress().getZip(),
            }
        };
    }
}