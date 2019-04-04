const InvalidInputError = require('./InvalidInputError');

class CoordinatesSetOutOfBoundsError extends InvalidInputError {
    constructor(coordX1, coordY1, coordX2, coordY2) {
        super("Supplied Coordinates set are not within canvas boundaries." +
            "Coordinate1: { X: " + coordX1 + ", Y: " + coordY1 + " }, " +
            "Coordinate2: { X: " + coordX2 + ", Y: " + coordY2 + " }"
        );
        this.name = "CoordinatesSetOutOfBoundsError";
        this.coordX1 = coordX1;
        this.coordY1 = coordY1;
        this.coordX2 = coordX2;
        this.coordY2 = coordY2;
    }
}
module.exports = CoordinatesSetOutOfBoundsError;
