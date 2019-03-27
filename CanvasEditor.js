const InvalidInputError = require('./InvalidInputError');

class CanvasEditor {
    constructor(canvas) {
        this.canvas = canvas;
    }

    drawLine(coordinate1, coordinate2) {
        if (!this.isCoordinateOutOfBounds(coordinate1) && !this.isCoordinateOutOfBounds(coordinate2)) {
            if (this.isHorizontal(coordinate1, coordinate2)) {
                // Y1, Y2 is the same therefore repeat inserts for X
                console.log('isHorizontal!');
                const startPoint = coordinate1.getX() < coordinate2.getX() ? coordinate1.getX() : coordinate2.getX();
                const lineLength = Math.abs(coordinate1.getX() - coordinate2.getX());
                for (let x = startPoint; x < startPoint + lineLength; x++) {
                    console.log('coordinates', x, coordinate1.getY());
                    this.canvas.setCellContent(x, coordinate1.getY(), 'x');
                }
            } else if (this.isVertical(coordinate1, coordinate2)) {
                // X1, X2 is the same therefore repeat inserts for Y
                console.log('isVertical!');
                const startPoint = coordinate1.getY() < coordinate2.getY() ? coordinate1.getY() : coordinate2.getY();
                const lineHeight = Math.abs(coordinate1.getY() - coordinate2.getY());
                for (let y = startPoint; y < startPoint + lineHeight; y++) {
                    console.log('coordinates', y, coordinate1.getX());
                    this.canvas.setCellContent(coordinate1.getX(), y, 'x');
                }
            } else {
                // Neither Xs and Yx of both coordinates match. They aren't horizontal nor vertical lines. Throw Error.
                console.log('neither!');
                throw new InvalidCoordinatesError(coordinate1, coordinate2);
            }
        } else {
            // Coordinate is out of canvas bounds. Throw an error
            console.log('outOfBounds!');
            throw new CoordinatesOutOfBoundsError(coordinate1, coordinate2);
        }
    }

    isCoordinateOutOfBounds(coordinate) {
        return coordinate.getX() < 0 || coordinate.getX() > this.canvas.getWidth() || coordinate.getY() < 0 || coordinate.getX() > this.canvas.getHeight()
    }

    isHorizontal(coordinate1, coordinate2) {
        return coordinate1.getY() === coordinate2.getY();
    }

    isVertical(coordinate1, coordinate2) {
        return coordinate1.getX() === coordinate2.getX();
    }


}

module.exports = CanvasEditor;
