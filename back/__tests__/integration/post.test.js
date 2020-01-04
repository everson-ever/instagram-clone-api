const request = require('supertest');
const port = process.env.PORT || 3333;
const api = `http://localhost:${port}/api`;

//const tokenAdmin = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTEwN2MyNDRiYzVlYTVhMjRjMTk4M2UiLCJuYW1lIjoiRXZlcnNvbiAyMjIiLCJyb2xlIjoidXNlciIsImlhdCI6MTU3ODE3NzA4NiwiZXhwIjoxNTc4MjYxNjg2fQ.Lrvg79emYMuHhD59ZQLTqqnO1W0zMXFlbqMaOe7aZ24`;
const tokenUser = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTEwN2MyNDRiYzVlYTVhMjRjMTk4M2UiLCJuYW1lIjoiRXZlcnNvbiAyMjIiLCJyb2xlIjoidXNlciIsImlhdCI6MTU3ODE3NzA4NiwiZXhwIjoxNTc4MjYxNjg2fQ.Lrvg79emYMuHhD59ZQLTqqnO1W0zMXFlbqMaOe7aZ24`;
//const authorizationAdmin = { authorization: 'Bearer ' + tokenAdmin };
const authorizationUser = { authorization: 'Bearer ' + tokenUser };

describe('posts', () => {
	it('INDEX /posts expected list of posts', () => {
		return request(api)
			.get('/posts')
			.set(authorizationUser)
			.then((response) => {
				expect(response.type).toBe('application/json');
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('GET /posts/:id expected one post in response and status 200', () => {
		return request(api)
			.get('/posts/5e1083658313c848243d78a5')
			.set(authorizationUser)
			.then((response) => {
				expect(response.body._id).toBeDefined();
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('STORE /posts expected one post in response and status 201', () => {
		return request(api)
			.post('/posts')
			.send({ content: 'New Post of Everson', image: 'NewImage.jpg' })
			.set(authorizationUser)
			.then((response) => {
				expect(response.body._id).toBeDefined();
				expect(response.status).toBe(201);
			})
			.catch(fail);
	});

	it('UPDATE /posts/:id expected one post in response and status 200', () => {
		return request(api)
			.put('/posts/5e1083658313c848243d78a5')
			.send({ content: 'Edited of tests', image: 'NewImage.jpg' })
			.set(authorizationUser)
			.then((response) => {
				expect(response.body._id).toBeDefined();
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});

	it('DESTROY /posts/:id  expected status equal 200', () => {
		return request(api)
			.delete('/posts/5e1083658313c848243d78a5')
			.set(authorizationUser)
			.then((response) => {
				expect(response.status).toBe(200);
			})
			.catch(fail);
	});
});
