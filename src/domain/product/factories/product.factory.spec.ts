import Product from "../entity/product-a";
import ProductB from "../entity/product-b";
import ProductFactory from "./product.factory";

describe('ProductFactory', () => {
    it('should create a product type A', () => {
        const product = ProductFactory.create('A', 'product', 100);
    
        expect(product).toBeInstanceOf(Product);
        expect(product.getName()).toBe('product');
        expect(product.getPrice()).toBe(100);
    });

    it('should create a product type B', () => {
        const product = ProductFactory.create('B', 'product', 100);
    
        expect(product).toBeInstanceOf(ProductB);
        expect(product.getName()).toBe('product');
        expect(product.getPrice()).toBe(200);
    });

    it('should throw an error when the type is invalid', () => {
        expect(() => ProductFactory.create(<unknown>'C', 'product', 100)).toThrowError('Invalid product type');
    });
});