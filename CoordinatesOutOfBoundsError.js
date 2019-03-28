const InvalidInputError = require('./InvalidInputError');

class CoordinatesOutOfBoundsError extends InvalidInputError {
    constructor(coordinate) {
        super("Coordinate is not within canvas");
        this.name = "CoordinateOutOfBoundsError";
        this.coordinate = coordinate;
    }
}
module.exports = CoordinatesOutOfBoundsError;
