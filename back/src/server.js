const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const configDatabase = require('./config/database');



class App {

    constructor() {

        this.express = express();
        this.server = '';
        this.isDev = process.env.NODE_ENV !== 'production';

        this.database();
        this.middlewares();
        this.routes();
    }

    database() {
        mongoose.connect(configDatabase.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }


    middlewares() {
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(cors());

        this.server = require('http').Server(this.express);
        const io = require('socket.io')(this.server)

        this.express.use((req, res, next) => {
            req.io = io;

            next();
        });


    }

    routes() {
        this.express.use('/api', require('./routes'));
    }
}

module.exports = new App().server;