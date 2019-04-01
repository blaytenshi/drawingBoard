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

    render() {
        process.stdout.write('-'.repeat(this._width + 2));
        process.stdout.write('\n');
        for(let y = 0; y < this._height; y++) {
            process.stdout.write('|');
            for(let x = 0; x < this._width; x++) {
                process.stdout.write(this.getCellContent(x, y));
            }
            process.stdout.write('|\n')
        }
        process.stdout.write('-'.repeat(this._width + 2));
    }
}

module.exports = Canvas;
