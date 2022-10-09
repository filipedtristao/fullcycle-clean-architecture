import Address from "../entity/address";
import Customer from "../entity/customer";
import CustomerFactory from "./customer.factory";

describe('CustomerFactory', () => {
    it('should create a customer', () => {
        const customer = CustomerFactory.create('customer');
    
        expect(customer).toBeInstanceOf(Customer);
        expect(customer.getName()).toBe('customer');
        expect(customer.getAddress()).toBeUndefined();
    });

    it('should create a customer with address', () => {
        const address = new Address('street', 'city', 'state', 'country', 'zipCode');
        const customer = CustomerFactory.createWithAddress('customer', address);
    
        expect(customer).toBeInstanceOf(Customer);
        expect(customer.getName()).toBe('customer');
        expect(customer.getAddress()).toEqual(address);
    });
});