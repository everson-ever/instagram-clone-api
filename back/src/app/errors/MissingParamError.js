class MissingParamError extends Error {
    constructor(errors) {
        super(errors);
        this.name = 'MissingParamError';
        this.params = errors;

    }
}

module.exports = MissingParamError;