import { v4 } from "uuid";
import Product from "../entity/product-a";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";

export default class ProductFactory {
    static create(type: 'A' | 'B', name: string, price: number): ProductInterface {
        switch (type) {
            case 'A':
                return new Product(v4(), name, price);
            case 'B':
                return new ProductB(v4(), name, price);
            default:
                throw new Error('Invalid product type');
        }
    }
}