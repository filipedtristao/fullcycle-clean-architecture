import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import FindCustomerUseCase from "./find-customer.use-case";

const mockRepository = () => ({
    create: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue(null),
});

describe(FindCustomerUseCase, () => {
    it('should find a customer by id', async () => {
        const customer = new Customer('123', 'John Doe');
        const address = new Address('Street', '123', 'City', 'State', '12345-678');
        customer.changeAddress(address);
        
        const customerRepository = mockRepository();
        customerRepository.findById.mockResolvedValue(customer);

        await customerRepository.create(customer);

        const input = { id: customer.getId() };
        const output = {
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

        const findCustomer = new FindCustomerUseCase(customerRepository);
        const customerFound = await findCustomer.execute(input);

        expect(customerFound).toEqual(output);
    });

    it('should not find a customer by id', async () => {
        const customerRepository = mockRepository();
        customerRepository.findById.mockImplementation(() => {
            throw new Error('Customer not found');
        });

        const input = { id: '123' };

        const findCustomer = new FindCustomerUseCase(customerRepository);
        
        await expect(findCustomer.execute(input)).rejects.toThrow('Customer not found');
    });
});