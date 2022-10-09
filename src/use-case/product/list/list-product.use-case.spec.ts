import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductModel from "../../../infra/product/repositories/sequelize/product.model";
import ProductRepository from "../../../infra/product/repositories/sequelize/product.repository";
import ListProducUseCase from "./list-product.use-case";

describe(ListProducUseCase, () => {
    describe("Unit", () => {
        const product1 = ProductFactory.create('A', 'Product 1', 10);
        const product2 = ProductFactory.create('A', 'Product 2', 20);

        const mockRepository = {
            findAll: jest.fn().mockResolvedValue([product1, product2]),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
        };

        it("should return a list of products", async () => {
            const useCase = new ListProducUseCase(mockRepository);
            const result = await useCase.execute({});

            expect(result).toEqual({
                products: [
                    {
                        id: product1.getId(),
                        name: product1.getName(),
                        price: product1.getPrice(),
                    },
                    {
                        id: product2.getId(),
                        name: product2.getName(),
                        price: product2.getPrice(),
                    }
                ]
            });
        });
    });

    describe("Integration", () => {
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

        it("should return a list of products", async () => {
            const product1 = ProductFactory.create('A', 'Product 1', 10);
            const product2 = ProductFactory.create('A', 'Product 2', 20);
            const productRepository = new ProductRepository();

            await productRepository.create(product1);
            await productRepository.create(product2);

            const useCase = new ListProducUseCase(productRepository);
            const result = await useCase.execute({});

            expect(result).toEqual({
                products: [
                    {
                        id: product1.getId(),
                        name: product1.getName(),
                        price: product1.getPrice(),
                    },
                    {
                        id: product2.getId(),
                        name: product2.getName(),
                        price: product2.getPrice(),
                    }
                ]
            });
        });
    });
});