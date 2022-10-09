import ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";
import { ListProductInputDto, ListProductOutputDto } from "./list-product.dto";

export default class ListProducUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(input: ListProductInputDto): Promise<ListProductOutputDto> {
        const products = await this.productRepository.findAll();

        return {
            products: products.map(product => ({
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
            }))
        };
    }
}