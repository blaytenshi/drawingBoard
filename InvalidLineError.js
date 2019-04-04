const InvalidInputError = require('./InvalidInputError');

class InvalidLineError extends InvalidInputError {
    constructor(coordX1, coordY1, coordX2, coordY2) {
        super("Given coordinates do not produce a horizontal or vertical line! " +
            "Coordinate1: { X: " + coordX1 + ", Y: " + coordY1 + " }, " +
            "Coordinate2: { X: " + coordX2 + ", Y: " + coordY2 + " }"
        );
        this.name = "InvalidLineError"
    }
}

module.exports = InvalidLineError;
