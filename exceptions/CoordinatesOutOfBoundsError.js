class CoordinatesOutOfBoundsError extends Error {
    constructor(message, canvasWidth, canvasHeight, coordX, coordY) {
        super(
            `${message}\n
            Coordinate: { X: ${coordX}, Y: ${coordY} }\n
            Canvas Boundaries: { W: ${canvasWidth}, H: ${canvasHeight} }`
        );
        this.name = "CoordinatesOutOfBoundsError";
    }
}
module.exports = CoordinatesOutOfBoundsError;
