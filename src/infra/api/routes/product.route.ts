import { Router } from "express";
import CreateProductUseCase from "../../../use-case/product/create/create-product.use-case";
import ListProducUseCase from "../../../use-case/product/list/list-product.use-case";
import ProductRepository from "../../product/repositories/sequelize/product.repository";

export const productRoute: Router = Router();

productRoute.post("/", async (req, res) => {
    try {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: <'A'>'A',
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        };

        const output = await productUseCase.execute(input);

        res.status(201).json(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req, res) => {
    try {
        const productRepository = new ProductRepository();
        const listProductsUseCase = new ListProducUseCase(productRepository);

        const output = await listProductsUseCase.execute({});

        res.status(200).json(output);
    } catch (err) {
        res.status(500).send(err);
    }
});