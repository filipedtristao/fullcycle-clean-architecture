import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import ListCustomerUseCase from "./list-customer.use-case";

const address1 = new Address('street1', 'number1', 'city1', 'state1', 'zip1');
const address2 = new Address('street2', 'number2', 'city2', 'state2', 'zip2');

const customer1 = CustomerFactory.createWithAddress('name1', address1);
const customer2 = CustomerFactory.createWithAddress('name2', address2);

const mockRepository = () => ({
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
});

describe(ListCustomerUseCase, () => {
    it('should list all customers', async () => {
        const customerRepository = mockRepository();

        const input = {};

        const output = {
            customers: [
                {
                    id: customer1.getId(),
                    name: customer1.getName(),
                    address: {
                        street: customer1.getAddress().getStreet(),
                        number: customer1.getAddress().getNumber(),
                        city: customer1.getAddress().getCity(),
                        state: customer1.getAddress().getState(),
                        zip: customer1.getAddress().getZip(),
                    }
                },
                {
                    id: customer2.getId(),
                    name: customer2.getName(),
                    address: {
                        street: customer2.getAddress().getStreet(),
                        number: customer2.getAddress().getNumber(),
                        city: customer2.getAddress().getCity(),
                        state: customer2.getAddress().getState(),
                        zip: customer2.getAddress().getZip(),
                    }
                }
            ]
        }

        const listCustomer = new ListCustomerUseCase(customerRepository);
        const customers = await listCustomer.execute(input);

        expect(customers).toEqual(output);
    });
});