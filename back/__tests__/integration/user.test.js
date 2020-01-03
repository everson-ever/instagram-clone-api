//const jest = require('jest');
const request = require('supertest');
const port = process.env.PORT || 3333;
const api = `http://localhost:${port}/api`;

const tokenAdmin = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ5MmRlZDllYzM0YzEyNzgwOWUzYTQiLCJuYW1lIjoiQWxjaWRlcyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3ODA3ODA1NiwiZXhwIjoxNTc4MTYyNjU2fQ.K02zlXkFUDiRJB1BWRiQvfMn-0ASPz2WMyluwWRKXtU`;
const tokenUser = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBkYzhhZTVhOWUyMzFiZmMyNjcxYmIiLCJuYW1lIjoiTWFyaWEgTG91cmRlcyA1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzgwNzc5NjMsImV4cCI6MTU3ODE2MjU2M30.0m3IHvKfVpNRSUwSreETXrJBRGkWRqNhABcjYWf8vrk`;
const authorizationAdmin = { authorization: 'Bearer ' + tokenAdmin };
const authorizationUser = { authorization: 'Bearer ' + tokenUser };

describe('users', () => {
	it('GET /users Admin', () => {
		return request(api)
			.get('/users')
			.set(authorizationAdmin)
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('GET /users Normal User', () => {
		return request(api)
			.get('/users')
			.set(authorizationUser)
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(401);
			})
			.catch(fail);
	});

	it('GET /users/:id with token', () => {
		return request(api)
			.get(`/users/5dd92ded9ec34c127809e3a4`)
			.set(authorizationUser)
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
			.set(authorizationUser)
			.then((response) => {
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('DELETE /users/:id', () => {
		return request(api)
			.delete('/users/5e0dc6afd2e74f4368c92ba0')
			.set(authorizationUser)
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(200);
				expect(response.body._id).toBeDefined();
			})
			.catch(fail);
	});
});
