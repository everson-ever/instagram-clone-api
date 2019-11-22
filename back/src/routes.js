const routes = require('express').Router();


const UserController = require('./app/controllers/UserController');


routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.get);
routes.post('/users', UserController.store);


module.exports = routes;