const InvalidInputError = require('./InvalidInputError');

class InvalidCoordinateError extends InvalidInputError {
    constructor(x, y) {
        super("Coordinate values cannot be less than 0! X: " + x + " Y: " + y);
        this.name = "InvalidCoordinateError";
        this.x = x;
        this.y = y;
    }
}

module.exports = InvalidCoordinateError;
