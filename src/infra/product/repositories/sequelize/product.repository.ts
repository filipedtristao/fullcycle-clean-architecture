import Product from "../../../../domain/product/entity/product-a";
import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../../domain/product/repositories/product.repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(product: ProductInterface): Promise<void> {
        await ProductModel.create({
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        })
    }

    async update(product: ProductInterface): Promise<void> {
        await ProductModel.update({
            name: product.getName(),
            price: product.getPrice(),
        }, {
            where: {
                id: product.getId(),
            },
        });
    }

    async findAll(): Promise<ProductInterface[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(model => new Product(model.id, model.name, model.price));
    }

    async findById(id: string): Promise<ProductInterface> {
        const model = await ProductModel.findOne({where: {id}});

        if (!model) {
            throw new Error('Product not found');
        }

        return new Product(model.id, model.name, model.price);
    }
}