class InvalidParamError extends Error {
    constructor(errors) {
        super(errors);
        this.name = 'InvalidParamError';
        this.params = errors;

    }
}

module.exports = InvalidParamError;