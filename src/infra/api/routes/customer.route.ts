import { Router } from "express";
import { CreateCustomerUseCase } from "../../../use-case/customer/create/create-customer.use-case";
import ListCustomerUseCase from "../../../use-case/customer/list/list-customer.use-case";
import CustomerRepository from "../../customer/repositories/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute: Router = Router();

customerRoute.post("/", async (req, res) => {
    try {
        const customerRepository = new CustomerRepository();
        const customerUseCase = new CreateCustomerUseCase(customerRepository);
        const input = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                state: req.body.address.state,
                zip: req.body.address.zip,
            },
        };

        const output = await customerUseCase.execute(input);

        res.status(201).json(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get("/", async (req, res) => {
    try {
        const customerRepository = new CustomerRepository();
        const listCustomersUseCase = new ListCustomerUseCase(customerRepository);

        const output = await listCustomersUseCase.execute({});

        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(CustomerPresenter.toXml(output)),
        });
    } catch (err) {
        res.status(500).send(err);
    }
});