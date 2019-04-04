const InvalidCanvasDimensionsError = require('./InvalidCanvasDimensionsError');

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
        return this.canvas[coordY - 1][coordX - 1];
    }

    setCellContent(coordX, coordY, fillValue) {
        this.canvas[coordY - 1][coordX - 1] = fillValue
    }
}

module.exports = Canvas;
