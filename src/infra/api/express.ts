import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repositories/sequelize/customer.model';
import ProductModel from '../product/repositories/sequelize/product.model';
import { customerRoute } from './routes/customer.route';
import { productRoute } from './routes/product.route';

export const app: Express = express();
app.use(express.json());
app.use('/customers', customerRoute);
app.use('/products', productRoute);

export let sequelize: Sequelize;

async function setupDatabase() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true },
    });

    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
}

setupDatabase();