const {  } = require('../errors/ServerError');
const ServerError = require('../errors/ServerError');

const badRequest = (error) => {
    return {
        statusCode: 400,
        error: error
    }
}

const serverError = () => {
    return {
        statusCode: 500,
        error: new ServerError()
    }
}

const ok = (data) => {
    return {
        statusCode: 200,
        body: data
    }
}

module.exports = {
    badRequest,
    serverError,
    ok
}