class Renderer {
    constructor(output) {
        this.output = output;
    }

    render(canvas) {
        this.output.write('-'.repeat(canvas.getWidth() + 2));
        this.output.write('\n');
        for(let y = 0; y < canvas.getHeight(); y++) {
            this.output.write('|');
            for(let x = 0; x < canvas.getWidth(); x++) {
                this.output.write(canvas.getCellContent(x, y));
            }
            this.output.write('|\n')
        }
        this.output.write('-'.repeat(canvas.getWidth() + 2));
        this.output.write('\n');
    }
}

module.exports = Renderer;
