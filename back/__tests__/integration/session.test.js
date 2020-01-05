//const jest = require('jest');
const request = require('supertest');



describe('register user', () => {
	it('POST /register expected status 201 and a new user', () => {
		return request(api)
			.post('/register')
			.send({
				name: "Everson Silva",
				email: "everson@mail.com",
				gender: "m",
				password: "000000"
			})
			.then(response => {
				expect(response.body).toBeDefined()
				expect(response.status).toBe(201)
			})
			.catch(fail)
	})
});

describe('session', () => {
	it('POST /session expected token in response', () => {
		return request(api)
			.post('/session')
			.send({ email: 'everson@mail.com', password: '000000' })
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body.token).toBeDefined();
			})
			.catch(fail);
	});

	it("POST /session don't expected token in response", () => {
		return request(api)
			.post('/session')
			.send({ email: 'everson@mail.com', password: '111111' })
			.then((response) => {
				expect(response.status).toBe(404);
				expect(response.body.token).toBeUndefined();
			})
			.catch(fail);
	});
});


