const InvalidCanvasDimensionsError = require('../exceptions/InvalidCanvasDimensionsError');
const CoordinateOutOfBoundsError = require('../exceptions/CoordinatesOutOfBoundsError');

class Canvas {
    constructor(width, height) {
        this._width = width;
        this._height = height;

        this.canvas = new Array(height);
        for(let i = 0; i < this.canvas.length; i++) {
            const array = new Array(width);
            this.canvas[i] = array.fill(' ');
        }
    }

    static create(width, height) {
        if (width < 1 || height < 1) {
            throw new InvalidCanvasDimensionsError('Canvas dimensions cannot be less than 1.', width, height);
        }
        return new Canvas(width, height);
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    getCellContent(coordX, coordY) {
        if (this.isCoordinatesOutOfBounds(coordX, coordY)) {
            throw new CoordinateOutOfBoundsError('Coordinates are not within Canvas bounds.', this.getWidth(), this.getHeight(), coordX, coordY);
        }
        return this.canvas[coordY - 1][coordX - 1];
    }

    setCellContent(coordX, coordY, fillValue) {
        if (this.isCoordinatesOutOfBounds(coordX, coordY)) {
            throw new CoordinateOutOfBoundsError('Coordinates are not within Canvas bounds.', this.getWidth(), this.getHeight(), coordX, coordY);
        }
        this.canvas[coordY - 1][coordX - 1] = fillValue
    }

    isCoordinatesOutOfBounds(coordX, coordY) {
        return coordX < 1 || coordX > this.getWidth() || coordY < 1 || coordY > this.getHeight();
    }
}

module.exports = Canvas;
