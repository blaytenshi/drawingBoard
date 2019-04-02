const InvalidCoordinateError = require('./InvalidCoordinateError');

class Coordinate {
    constructor(x, y) {
        if (x < 0 || y < 0 || (typeof x !== "number") || (typeof y !== "number")) {
            throw new InvalidCoordinateError(x, y)
        }
        this._x = x;
        this._y = y;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

}

module.exports = Coordinate;
