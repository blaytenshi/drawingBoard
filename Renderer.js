class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
    }

    render() {
        process.stdout.write('-'.repeat(this.canvas.getWidth() + 2));
        process.stdout.write('\n');
        for(let x = 0; x < this.canvas.getHeight(); x++) {
            process.stdout.write('|');
            for(let y = 0; y < this.canvas.getWidth(); y++) {
                process.stdout.write(this.canvas.getCellContent(x, y));
            }
            process.stdout.write('|\n')
        }
        process.stdout.write('-'.repeat(this.canvas.getWidth() + 2));
    }
}

module.exports = Renderer;
