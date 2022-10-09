import ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.productRepository.findById(input.id);

        return {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        };
    }
}