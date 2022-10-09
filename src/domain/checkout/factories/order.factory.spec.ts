import { v4 } from "uuid";
import Order from "../entity/order";
import OrderFactory from "./order.factory";

describe('OrderFactory', () => {
    it('should create an order', () => {
        const orderData = {
            id: v4(),
            customerId: v4(),
            items: [
                {
                    id: v4(),
                    productId: v4(),
                    name: 'Product 1',
                    quantity: 1,
                    price: 100
                }
            ],
        };

        const order = OrderFactory.create(orderData);
    
        expect(order).toBeInstanceOf(Order);
        expect(order.getId()).toBe(orderData.id);
        expect(order.getCustomerId()).toBe(orderData.customerId);
        expect(order.getItems()).toEqual(orderData.items);
    });
});