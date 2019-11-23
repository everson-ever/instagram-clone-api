//const jest = require('jest');
const request = require('supertest');
const port = process.env.PORT || 3333
const api = `http://localhost:${port}/api`;

describe('users', () => {
    it('GET /users', () => {
        return request(api)
        .get('/users')
        .then(response => {
            expect(response.type).toBe('application/json')
            expect(response.status).toBe(200)
        })
        .catch(fail)
    });

    it('GET /users/:id', () => {
        return request(api)
        .get(`/users/5dd85c3871501a33e8d4c66a`)
        .then(response => {
            expect(response.type).toBe('application/json')
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
        }).catch(fail);
    });

    test('POST /users', () => {
        return request(api)
        .post('/users')
        .send({name: "Alcides 2", email: "alcidessilva2@gmail.com", gender: "m", password: "111111"})
        .then(response => {
            expect(response.status).toBe(201);
            expect(response.body._id).toBeDefined();
        })
        .catch(fail);
    })

    it('UPDATE /users', () => {
        return request(api)
        .put('/users/5dd85c3871501a33e8d4c66a')
        .send(
            {
                "name": "Everson Silva",
                "email": "everson@gmail.com",
                "gender": "m",
                "password": "101010"
            }
        )
        .then(response => {
            expect(response.status).toBe(200);
        })
        .catch(fail);
    })

    it('DELETE /users/:id', () => {
        return request(api)
        .delete('/users/5dd85c3871501a33e8d4c66a')
        .then(response => {
            expect(response.type).toBe('application/json')
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
        })
        .catch(fail);
    })



})




