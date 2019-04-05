const InvalidLineError = require('../exceptions/InvalidLineError');
const CoordinateOutOfBoundsError = require('../exceptions/CoordinatesOutOfBoundsError');
const InvalidCanvasDimensionsError = require('../exceptions/InvalidCanvasDimensionsError');
const CanvasNotInitializedError = require('../exceptions/CanvasNotInitializedError');

class CanvasEditor {

    drawLine(canvas, coordX1, coordY1, coordX2, coordY2) {
        if (canvas === undefined) {
            throw new CanvasNotInitializedError('Canvas has not been initialized! Please first create a canvas!');
        }
        if (coordY1 === coordY2) {
            // Y1, Y2 is the same therefore repeat inserts for X
            const startPoint = Math.min(coordX1, coordX2);
            const lineLength = Math.abs(coordX1 - coordX2);
            for (let i = startPoint; i <= startPoint + lineLength; i++) {
                canvas.setCellContent(i, coordY1, 'x');
            }
        } else if (coordX1 === coordX2) {
            // X1, X2 is the same therefore repeat inserts for Y
            const startPoint = Math.min(coordY1, coordY2);
            const lineHeight = Math.abs(coordY1 - coordY2);
            for (let i = startPoint; i <= startPoint + lineHeight; i++) {
                canvas.setCellContent(coordX1, i, 'x');
            }
        } else {
            throw new InvalidLineError(coordX1, coordY1, coordX2, coordY2);
        }
    }

    drawRectangle(canvas, coordX1, coordY1, coordX2, coordY2) {
        if (canvas === undefined) {
            throw new CanvasNotInitializedError('Canvas has not been initialized! Please first create a canvas!');
        }
        // draws lines in counter clockwise
        this.drawLine(canvas,
            coordX1, coordY1,
            coordX1, coordY2
        );
        this.drawLine(canvas,
            coordX1, coordY2,
            coordX2, coordY2
        );
        this.drawLine(canvas,
            coordX2, coordY2,
            coordX2, coordY1
        );
        this.drawLine(canvas,
            coordX2, coordY1,
            coordX1, coordY1,
        );
    }

    bucketFill(canvas, startX, startY, userFillValue) {
        if (canvas === undefined) {
            throw new CanvasNotInitializedError('Canvas has not been initialized! Please first create a canvas!');
        }
        // gets initial filled value from start coordinates for later comparison
        const initialFillValue = canvas.getCellContent(startX, startY);

        this.recursiveFill(canvas, startX, startY, initialFillValue, userFillValue)
    }

    // recursive function to recursively fill in the canvas
    recursiveFill(canvas, startX, startY, initialFillValue, userFillValue) {
        if (startX < 1 || startX > canvas.getWidth() || startY < 1 || startY > canvas.getHeight()) {
            return;
        }
        if (canvas.getCellContent(startX, startY) === initialFillValue) {
            canvas.setCellContent(startX, startY, userFillValue);
            // will only recursively fill in the top, bottom, left and right values so as not to
            // accidentally fill in diagonal coordinates
            // top
            this.recursiveFill(canvas, startX, startY - 1, initialFillValue, userFillValue);
            // right
            this.recursiveFill(canvas, startX + 1, startY, initialFillValue, userFillValue);
            // bottom
            this.recursiveFill(canvas, startX, startY + 1, initialFillValue, userFillValue);
            // left
            this.recursiveFill(canvas, startX - 1, startY, initialFillValue, userFillValue);
        }
    }

}

module.exports = CanvasEditor;
