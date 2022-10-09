import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer.repository.interface";
import { ListCustomerDtoInput, ListCustomerDtoOutput } from "./list-customer.dto";

export default class ListCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(input: ListCustomerDtoInput): Promise<ListCustomerDtoOutput> {
        const customers = await this.customerRepository.findAll();

        return {
            customers: customers.map((customer) => ({
                id: customer.getId(),
                name: customer.getName(),
                address: {
                    street: customer.getAddress().getStreet(),
                    number: customer.getAddress().getNumber(),
                    city: customer.getAddress().getCity(),
                    state: customer.getAddress().getState(),
                    zip: customer.getAddress().getZip(),
                },
            })),
        };
    }
}