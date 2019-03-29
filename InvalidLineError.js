const InvalidInputError = require('./InvalidInputError');

class InvalidLineError extends InvalidInputError {
    constructor(coordinate1, coordinate2) {
        super("Given coordinates do not produce a horizontal or vertical line! " +
            "Coordinate1: { X: " + coordinate1.getX() + ", Y: " + coordinate1.getY() + " }, " +
            "Coordinate2: { X: " + coordinate2.getY() + ", Y: " + coordinate2.getY() + " }"
        );
        this.name = "InvalidLineError"
    }
}

module.exports = InvalidLineError;
