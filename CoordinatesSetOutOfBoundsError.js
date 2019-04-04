
class CoordinatesSetOutOfBoundsError extends Error {
    constructor(coordX1, coordY1, coordX2, coordY2) {
        super(
            `Supplied Coordinates set are not within canvas boundaries.\n
            Coordinate1: { X: ${coordX1}, Y: ${coordY1} }\n
            Coordinate2: { X: ${coordX2}, Y: ${coordY2} }`
        );
        this.name = "CoordinatesSetOutOfBoundsError";
    }
}
module.exports = CoordinatesSetOutOfBoundsError;
