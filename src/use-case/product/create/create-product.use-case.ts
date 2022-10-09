import ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";
import { CreateProductDtoInput, CreateProductDtoOutput } from "./create-product.dto";
import ProductFactory from "../../../domain/product/factories/product.factory";

export default class CreateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(input: CreateProductDtoInput): Promise<CreateProductDtoOutput> {
        const product = ProductFactory.create(input.type, input.name, input.price);
        await this.productRepository.create(product);

        return {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice()
        };
    }
}