import ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";
import { UpdateProductDtoInput, UpdateProductDtoOutput } from "./update-product.dto";

export default class UpdateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(input: UpdateProductDtoInput): Promise<UpdateProductDtoOutput> {
        const product = await this.productRepository.findById(input.id);

        product.changeName(input.name);
        product.changePrice(input.price);

        await this.productRepository.update(product);

        return {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        };
    }
}
