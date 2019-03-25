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
                for (let start = coordinate1.getX(); start <= this.canvas.getWidth() - 1; start++) {
                    this.canvas.setCellContent(start, coordinate1.getY(), 'x');
                    console.log('setValue!');
                }
            } else if (this.isVertical(coordinate1, coordinate2)) {
                // X1, X2 is the same therefore repeat inserts for Y
                console.log('isVertical!');
            } else {
                // Neither Xs and Yx of both coordinates match. They aren't horizontal nor vertical lines. Throw Error.
                console.log('neither!');
            }
        } else {
            // Coordinate is out of canvas bounds. Throw an error
            console.log('outOfBounds!');
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
