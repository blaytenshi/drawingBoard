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

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    getCellContent(x, y) {
        return this.canvas[y][x];
    }

    setCellContent(x, y, fillValue) {
        this.canvas[y][x] = fillValue
    }
}

module.exports = Canvas;
