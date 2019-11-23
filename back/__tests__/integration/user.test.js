//const jest = require('jest');
const request = require('supertest');
const port = process.env.PORT || 3333
const api = `http://localhost:${port}/api`;

describe('users', () => {
    test('GET /users', () => {
        return request(api)
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200);
        })
        .catch(fail)
    });

    test('GET /users/:id', () => {
        return request(api)
        .get(`/users/5dd85c3871501a33e8d4c66a`)
        .then(response => {
            expect(response.status).toBe(200)
        }).catch(fail)
    })



})




