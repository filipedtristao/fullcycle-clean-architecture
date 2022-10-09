import Order from "../entity/order";
import OrderItem from "../entity/order-item";

interface OrderData {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    static create(data: OrderData): Order {
        const items = data.items.map(item => new OrderItem(item.id, item.productId, item.name, item.quantity, item.price));

        return new Order(data.id, data.customerId, items);
    }
}