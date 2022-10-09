import Product from "../entity/product-a";

export default class ProductService {
    static increasePrice(products: Product[], percentage: number) {
        products.forEach(product => {
            product.changePrice(product.getPrice() + (product.getPrice() * (percentage / 100)));
        });
    }
}