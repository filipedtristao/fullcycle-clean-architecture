import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductModel from "../../../infra/product/repositories/sequelize/product.model";
import ProductRepository from "../../../infra/product/repositories/sequelize/product.repository";
import UpdateProductUseCase from "./update-product.use-case";

describe(UpdateProductUseCase, () => {
    describe('Unit', () => {
        const product = ProductFactory.create('A', 'name', 1);

        const repositoryMock = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn().mockResolvedValue(product),
            findAll: jest.fn(),
        };

        it('should update a product', async () => {
            const useCase = new UpdateProductUseCase(repositoryMock);

            const output = await useCase.execute({
                id: product.getId(),
                name: 'updated name',
                price: 2
            });

            expect(output).toEqual({
                id: product.getId(),
                name: 'updated name',
                price: 2
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

        it('should update a product', async () => {
            const productRepository = new ProductRepository();
            const useCase = new UpdateProductUseCase(productRepository);
            const product = ProductFactory.create('A', 'name', 1);

            await productRepository.create(product);

            const output = await useCase.execute({
                id: product.getId(),
                name: 'updated name',
                price: 2
            });

            expect(output).toEqual({
                id: product.getId(),
                name: 'updated name',
                price: 2
            });
        });
    });
});