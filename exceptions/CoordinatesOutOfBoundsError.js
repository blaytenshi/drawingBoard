
class CoordinatesOutOfBoundsError extends Error {
    constructor(message, canvas, coordX, coordY) {
        super(
            `${message}\n
            Coordinate1: { X: ${coordX}, Y: ${coordY} }\n
            Canvas Boundaries: { W: ${canvas.getWidth()}, H: ${canvas.getHeight()} }`
        );
        this.name = "CoordinatesOutOfBoundsError";
    }
}
module.exports = CoordinatesOutOfBoundsError;
