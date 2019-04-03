class Renderer {
    constructor(output) {
        this.output = output;
    }

    render(canvas) {
        this.output.write('-'.repeat(canvas.getWidth() + 2));
        this.output.write('\n');
        for(let y = 1; y <= canvas.getHeight(); y++) {
            this.output.write('|');
            for(let x = 1; x <= canvas.getWidth(); x++) {
                this.output.write(canvas.getCellContent(x, y));
            }
            this.output.write('|\n')
        }
        this.output.write('-'.repeat(canvas.getWidth() + 2));
        this.output.write('\n\n');
    }
}

module.exports = Renderer;
