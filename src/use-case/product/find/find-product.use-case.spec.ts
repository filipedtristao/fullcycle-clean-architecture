import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductModel from "../../../infra/product/repositories/sequelize/product.model";
import ProductRepository from "../../../infra/product/repositories/sequelize/product.repository";
import FindProductUseCase from "./find-product.use-case";

describe(FindProductUseCase, () => {
    describe('Unit', () => {
        const product = ProductFactory.create('A', 'Product 1', 10);

        const mockRepository = {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn().mockResolvedValue(product),
        };

        it('should return a product', async () => {
            const useCase = new FindProductUseCase(mockRepository);
            const result = await useCase.execute({ id: product.getId() });

            expect(result).toEqual({
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
            });
        });
    });

    describe('Integration', () => {
        let sequelize: Sequelize;

        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true },
            });

            sequelize.addModels([ProductModel]);
            await sequelize.sync();
        });

        it('should return a product', async () => {
            const product = ProductFactory.create('A', 'Product 1', 10);
            const productRepository = new ProductRepository();

            await productRepository.create(product);

            const useCase = new FindProductUseCase(productRepository);
            const result = await useCase.execute({ id: product.getId() });

            expect(result).toEqual({
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
            });
        });
    });
});