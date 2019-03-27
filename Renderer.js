class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
    }

    render() {
        process.stdout.write('-'.repeat(this.canvas.getWidth() + 2));
        process.stdout.write('\n');
        for(let y = 0; y < this.canvas.getHeight(); y++) {
            process.stdout.write('|');
            for(let x = 0; x < this.canvas.getWidth(); x++) {
                process.stdout.write(this.canvas.getCellContent(x, y));
            }
            process.stdout.write('|\n')
        }
        process.stdout.write('-'.repeat(this.canvas.getWidth() + 2));
    }
}

module.exports = Renderer;
