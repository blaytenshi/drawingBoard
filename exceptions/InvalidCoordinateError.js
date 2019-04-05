class InvalidCoordinateError extends Error {
    constructor(x, y) {
        super(`Coordinate values cannot be less than 0! { X: ${x}, Y: ${y} }`);
        this.name = "InvalidCoordinateError";
    }
}

module.exports = InvalidCoordinateError;
