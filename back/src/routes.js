const routes = require('express').Router();


const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.post('/session', SessionController.store);


routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.get);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);


module.exports = routes;