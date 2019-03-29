const InvalidLineError = require('./InvalidLineError');
const CoordinateOutOfBoundsError = require('./CoordinatesSetOutOfBoundsError');

class CanvasEditor {
    constructor(canvas) {
        this.canvas = canvas;
    }

    drawLine(coordinate1, coordinate2) {
        if (!this.isCoordinatesOutOfBounds(coordinate1, coordinate2)) {
            if (this.isHorizontal(coordinate1, coordinate2)) {
                // Y1, Y2 is the same therefore repeat inserts for X
                const startPoint = Math.min(coordinate1.getX(), coordinate2.getX());
                const lineLength = Math.abs(coordinate1.getX() - coordinate2.getX());
                for (let x = startPoint; x < startPoint + lineLength; x++) {
                    this.canvas.setCellContent(x, coordinate1.getY(), 'x');
                }
            } else if (this.isVertical(coordinate1, coordinate2)) {
                // X1, X2 is the same therefore repeat inserts for Y
                const startPoint = Math.min(coordinate1.getY(), coordinate2.getY());
                const lineHeight = Math.abs(coordinate1.getY() - coordinate2.getY());
                for (let y = startPoint; y < startPoint + lineHeight; y++) {
                    this.canvas.setCellContent(coordinate1.getX(), y, 'x');
                }
            } else {
                throw new InvalidLineError(coordinate1, coordinate2);
            }
        } else {
            throw new CoordinateOutOfBoundsError(coordinate1, coordinate2);
        }
    }

    isCoordinatesOutOfBounds(coordinate1, coordinate2) {
        return coordinate1.getX() > this.canvas.getWidth() ||
            coordinate2.getX() > this.canvas.getWidth() ||
            coordinate1.getY() > this.canvas.getHeight() ||
            coordinate2.getY() > this.canvas.getHeight();
    }

    isHorizontal(coordinate1, coordinate2) {
        return coordinate1.getY() === coordinate2.getY();
    }

    isVertical(coordinate1, coordinate2) {
        return coordinate1.getX() === coordinate2.getX();
    }

}

module.exports = CanvasEditor;
