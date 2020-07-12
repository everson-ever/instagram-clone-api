const request = require('supertest');
const port = process.env.PORT || 3333;
const api = `http://localhost:${port}/api`;


describe('SignupController', () => {

	it('/register - returns status code 400 if no name is provided', async () => {
		try {
            const response = await request(api)
                .post('/register')
                .send({ email: 'lour@gmail.com', gender: 'f', password: '111111' });
            expect(response.statusCode).toBe(400);
        }
        catch (fail) {
            return fail(fail);
        }
    });
    
    it('/register - returns status code 400 if no email is provided', async () => {
		try {
            const response = await request(api)
                .post('/register')
                .send({ name: 'Everson silva', gender: 'f', password: '111111' });
            expect(response.statusCode).toBe(400);
        }
        catch (fail) {
            return fail(fail);
        }
    });
    
    it('/register - returns status code 400 if no gender is provided', async () => {
		try {
            const response = await request(api)
                .post('/register')
                .send({ name: 'Everson silva', email: 'everson@gmail.com', password: '111111' });
            expect(response.statusCode).toBe(400);
        }
        catch (fail) {
            return fail(fail);
        }
    });
    
    it('/register - returns status code 400 if no password is provided', async () => {
		try {
            const response = await request(api)
                .post('/register')
                .send({ name: 'Everson silva', email: 'everson@gmail.com', gender: 'm' });
            expect(response.statusCode).toBe(400);
        }
        catch (fail) {
            return fail(fail);
        }
    });

    it('/register - returns status code 400 if an incorrect gender is provided', async () => {
		try {
            const response = await request(api)
                .post('/register')
                .send({ name: 'Everson silva', email: 'everson@gmail.com', gender: 'dasjdh', password: '123456' });
            expect(response.statusCode).toBe(400);
        }
        catch (fail) {
            return fail(fail);
        }
    });

    
    it('/register - returns status code 201 if correct data is provided', async () => {
		try {
            const response = await request(api)
                .post('/register')
                .send({ name: 'Everson silva', email: 'eversonsaz@gmail.com', gender: 'm', password: '123456' });
            expect(response.statusCode).toBe(201);
        }
        catch (fail) {
            return fail(fail);
        }
	});

});
