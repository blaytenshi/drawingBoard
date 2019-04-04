class InvalidLineError extends Error {
    constructor(coordX1, coordY1, coordX2, coordY2) {
        super(
            `Given coordinates do not produce a horizontal or vertical line.\n
            Coordinate1: { X: ${coordX1}, Y: ${coordY1} }\n
            Coordinate2: { X: ${coordX2}, Y: ${coordY2} }`
        );
        this.name = "InvalidLineError";
    }
}

module.exports = InvalidLineError;
