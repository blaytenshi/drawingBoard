const InvalidInputError = require('./InvalidInputError');

class InvalidOperationError extends InvalidInputError {
    constructor(message) {
        super(message);
        this.name = "InvalidOperationError"
    }
}

module.exports = InvalidOperationError;
