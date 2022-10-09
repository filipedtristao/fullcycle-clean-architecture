import Address from "../../../domain/customer/entity/address";
import { CreateCustomerInputDto, CreateCustomerOutputDto } from "./create-customer.dto";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer.repository.interface";

export class CreateCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) { }

    async execute(input: CreateCustomerInputDto): Promise<CreateCustomerOutputDto> {
        const address = new Address(input.address.street, input.address.number, input.address.city, input.address.state, input.address.zip);
        const customer = CustomerFactory.createWithAddress(input.name, address);

        await this.customerRepository.create(customer);

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