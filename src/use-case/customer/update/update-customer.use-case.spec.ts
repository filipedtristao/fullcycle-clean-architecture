import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import UpdateCustomerUseCase from "./update-customer.use-case";

const address = new Address('Street', '123', 'City', 'State', '12345-678');
const customer = CustomerFactory.createWithAddress('John Doe', address);

const mockRepository = () => ({
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
});

describe(UpdateCustomerUseCase, () => {
    it('should update a customer', async () => {
        const customerRepository = mockRepository();

        const input = {
            id: customer.getId(),
            name: 'Updated Name',
            address: {
                street: 'Updated Street',
                number: 'Updated Number',
                city: 'Updated City',
                state: 'Updated State',
                zip: 'Updated Zip',
            }
        };

        const output = {
            id: input.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                state: input.address.state,
                zip: input.address.zip,
            }
        }

        const updateCustomer = new UpdateCustomerUseCase(customerRepository);
        const customerUpdated = await updateCustomer.execute(input);

        expect(customerUpdated).toEqual(output);
    });
});