import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer.repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find-customer.dto";

export default class FindCustomerUseCase {
    constructor(
        private customerRepository: CustomerRepositoryInterface
    ) { }

    async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
        const customer = await this.customerRepository.findById(input.id);
        
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
        }
    }
}