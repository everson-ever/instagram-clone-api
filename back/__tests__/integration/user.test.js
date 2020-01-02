//const jest = require('jest');
const request = require('supertest');
const port = process.env.PORT || 3333;
const api = `http://localhost:${port}/api`;

describe('users', () => {
	it('GET /users', () => {
		return request(api)
			.get('/users')
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('GET /users/:id', () => {
		return request(api)
			.get(`/users/5dd92ded9ec34c127809e3a4`)
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(200);
				expect(response.body._id).toBeDefined();
			})
			.catch(fail);
	});

	it('POST /users', () => {
		return request(api)
			.post('/users')
			.send({ name: 'Maria Lourdes 5', email: 'lour@gmail.com', gender: 'f', password: '111111' })
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body._id).toBeDefined();
			})
			.catch(fail);
	});

	it('UPDATE /users', () => {
		return request(api)
			.put('/users/5dd92ded9ec34c127809e3a4')
			.send({
				name: 'Alcides',
				email: 'alceee@gmail.com',
				gender: 'm',
				password: '101010'
			})
			.then((response) => {
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('DELETE /users/:id', () => {
		return request(api)
			.delete('/users/5e0dc6afd2e74f4368c92ba0')
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(200);
				expect(response.body._id).toBeDefined();
			})
			.catch(fail);
	});
});
