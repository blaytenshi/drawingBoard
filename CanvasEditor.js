class CanvasEditor {
    constructor(canvas) {
        this.canvas = canvas;
    }

    drawLine(coordinate1, coordinate2) {
        if (!this.isStraight(coordinate1, coordinate2)) {
            throw new InvalidLineError();
        }
    }

    isStraight(coordinate1, coordinate2) {
        return coordinate1.getX() === coordinate2.getX() || coordinate1.getY() === coordinate2.getY();
    }
}

module.exports = CanvasEditor;
