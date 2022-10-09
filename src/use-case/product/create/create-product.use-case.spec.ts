import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repositories/sequelize/product.model";
import ProductRepository from "../../../infra/product/repositories/sequelize/product.repository";
import CreateProductUseCase from "./create-product.use-case";

describe(CreateProductUseCase, () => {
    describe('Unit', () => {
        const repositoryMock = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
        };

        it('should create a product', async () => {
            const useCase = new CreateProductUseCase(repositoryMock);

            const output = await useCase.execute({
                type: 'A',
                name: 'name',
                price: 1
            });

            expect(output).toEqual({
                id: expect.any(String),
                name: 'name',
                price: 1
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

        it('should create a product', async () => {
            const productRepository = new ProductRepository();
            const useCase = new CreateProductUseCase(productRepository);

            const output = await useCase.execute({
                type: 'A',
                name: 'name',
                price: 1
            });

            expect(output).toEqual({
                id: expect.any(String),
                name: 'name',
                price: 1
            });
        });
    });
});