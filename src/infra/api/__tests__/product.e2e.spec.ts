import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Product 1',
                price: 10,
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: 'Product 1',
            price: 10,
        });
    });

    it('should return 500 when create a product with invalid data', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: '',
            });

        expect(response.status).toBe(500);
    });

    it('should return all products', async () => {
        const product1 = {
            name: 'Product 1',
            price: 10,
        };

        const product2 = {
            name: 'Product 2',
            price: 20,
        };

        await request(app).post('/products').send(product1);
        await request(app).post('/products').send(product2);

        const response = await request(app).get('/products');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            products: [
                expect.objectContaining(product1),
                expect.objectContaining(product2),
            ]
        });
    });
});