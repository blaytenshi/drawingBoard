const InvalidInputError = require('./InvalidInputError');

class CoordinatesSetOutOfBoundsError extends InvalidInputError {
    constructor(coordinate1, coordinate2) {
        super("Supplied Coordinates set are not within canvas boundaries." +
            "Coordinate1: { X: " + coordinate1.getX() + ", Y: " + coordinate1.getY() + " }, " +
            "Coordinate2: { X: " + coordinate2.getY() + ", Y: " + coordinate2.getY() + " }"
        );
        this.name = "CoordinatesSetOutOfBoundsError";
        this.coordinate1 = coordinate1;
        this.coordinate2 = coordinate2;
    }
}
module.exports = CoordinatesSetOutOfBoundsError;
