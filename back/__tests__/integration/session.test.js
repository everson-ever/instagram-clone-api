//const jest = require('jest');
const request = require('supertest');
const port = process.env.PORT || 3333;
const api = `http://localhost:${port}/api`;

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
