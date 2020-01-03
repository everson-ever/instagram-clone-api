const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.post('/session', SessionController.store);

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/:id', authMiddleware, UserController.get);
routes.post('/users', authMiddleware, UserController.store);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.destroy);

module.exports = routes;
