const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');
const adminMiddleware = require('./app/middlewares/admin');
const roles = require('./config/roles');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PostController = require('./app/controllers/PostController');

routes.post('/session', SessionController.store);
routes.post('/register', UserController.store);

routes.get('/users', [ authMiddleware, adminMiddleware(roles.admin) ], UserController.index);
routes.get('/users/:id', authMiddleware, UserController.get);
routes.post('/users', authMiddleware, UserController.store);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.destroy);

routes.get('/posts', authMiddleware, PostController.index);
routes.get('/posts/:id', authMiddleware, PostController.get);
routes.post('/posts', authMiddleware, PostController.store);
routes.put('/posts/:id', authMiddleware, PostController.update);
routes.delete('/posts/:id', authMiddleware, PostController.destroy);

module.exports = routes;
