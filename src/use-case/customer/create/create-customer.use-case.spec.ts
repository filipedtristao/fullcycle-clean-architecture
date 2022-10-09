import { CreateCustomerUseCase } from "./create-customer.use-case";

const mockRepository = () => ({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
});

describe(CreateCustomerUseCase, () => {
    it('should create a customer', async () => {
        const customerRepository = mockRepository();

        const input = {
            name: 'John Doe',
            address: {
                street: 'Street',
                number: '123',
                city: 'City',
                state: 'State',
                zip: '12345-678',
            }
        };

        const output = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                state: input.address.state,
                zip: input.address.zip,
            }
        }

        const createCustomer = new CreateCustomerUseCase(customerRepository);
        const customerCreated = await createCustomer.execute(input);

        expect(customerCreated).toEqual(output);
    });

    it('should throw an error if customer name is not provided', async () => {
        const customerRepository = mockRepository();

        const input = {
            name: '',
            address: {
                street: 'Street',
                number: '123',
                city: 'City',
                state: 'State',
                zip: '12345-678',
            }
        };

        const createCustomer = new CreateCustomerUseCase(customerRepository);

        await expect(createCustomer.execute(input)).rejects.toThrowError('Name is required');
    });
});