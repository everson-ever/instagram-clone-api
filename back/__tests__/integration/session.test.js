//const jest = require('jest');
const request = require('supertest');
const port = process.env.PORT || 3333;
const api = `http://localhost:${port}/api`;

describe('session', () => {


	it('POST /session', () => {
		return request(api)
			.post('/session')
			.send({ email: 'lourdessadasd@gmail.com', password: '111111' })
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body.token).toBeDefined();
			})
			.catch(fail);
	});



});
