import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'John Doe',
                address: {
                    street: 'Main Street',
                    number: '123',
                    city: 'New York',
                    state: 'NY',
                    zip: '12345',
                },
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: 'John Doe',
            address: {
                street: 'Main Street',
                number: '123',
                city: 'New York',
                state: 'NY',
                zip: '12345',
            }
        });
    });

    it('should return 500 when create a customer with invalid data', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: '',
            });

        expect(response.status).toBe(500);
    });

    it('should return all customers', async () => {
        const customer1 = {
            name: 'John Doe',
            address: {
                street: 'Main Street',
                number: '123',
                city: 'New York',
                state: 'NY',
                zip: '12345',
            },
        }

        const customer2 = {
            name: 'Jane Doe',
            address: {
                street: 'Main Street',
                number: '123',
                city: 'New York',
                state: 'NY',
                zip: '12345',
            },
        }

        await request(app)
            .post('/customers')
            .send(customer1);

        await request(app)
            .post('/customers')
            .send(customer2);

        const response = await request(app)
            .get('/customers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            customers: [
                {
                    ...customer1,
                    id: expect.any(String),
                },
                {
                    ...customer2,
                    id: expect.any(String),
                },
            ]
        });
    });
});