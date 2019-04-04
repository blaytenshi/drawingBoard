const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const Coordinate = require('./Coordinate');
const Renderer = require('./Renderer');
const InvalidLineError = require('./InvalidLineError');
const CoordinatesOutOfBoundsError = require('./CoordinatesOutOfBoundsError');
const InvalidCanvasDimensionsError = require('./InvalidCanvasDimensionsError');

describe('The CanvasEditor', () => {
    let canvas;
    let canvasEditor;

    beforeAll(() => {
        canvas = Canvas.create(10,12);
        canvasEditor = new CanvasEditor(canvas);
    });

    it('should throw CoordinatesOutOfBoundsError when first set of coordinates for draw line that is out of canvas bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 50, 50, 10, 10);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw CoordinatesOutOfBoundsError when second set of coordinates for draw line that is out of canvas bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 5, 5, 100, 100);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw InvalidCanvasDimensionsError when attempting to draw line on non-existant canvas', () => {
        expect(() => {
            canvasEditor.drawLine(null, 5, 10, 10, 10);
        }).toThrow(InvalidCanvasDimensionsError);
    });

    it('should throw InvalidLineError when given coordinates doesn\'t cannot create horizontal or vertical line', () => {
        // since we're testing that the drawLine function actually throws errors with inputs, we must wrap it
        // inside an anonymous function when calling the function to test
        expect(() => {
            canvasEditor.drawLine(canvas, 1, 1, 3, 3)
        }).toThrow(InvalidLineError);
    });

    it('should throw InvalidCanvasDimensionsError when attempting to draw rectangle on non-existant canvas', () => {
        expect(() => {
            canvasEditor.drawRectangle(null, 5, 5, 10, 10);
        }).toThrow(InvalidCanvasDimensionsError);
    });

    it('should throw CoordinateOutOfBoundsError when first set of coordinates for draw rectangle is out of canvas bounds', () => {
        expect(() => {
            canvasEditor.drawRectangle(canvas, -1, -1, 10, 10);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw CoordinateOutOfBoundsError when second set of coordinates for draw rectangle is out of canvas bounds', () => {
        expect(() => {
            canvasEditor.drawRectangle(canvas, 5, 5, 15, 15);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw CoordinateOutOfBoundsError when coordinates for bucket fill is out of canvas bounds', () => {
        expect(() => {
            canvasEditor.bucketFill(canvas, 15, 15);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw InvalidCanvasDimensionsError when attempting to bucket fill on non-existant canvas', () => {
        expect(() => {
            canvasEditor.bucketFill(null, 10, 3, 'o')
        }).toThrow(InvalidCanvasDimensionsError);
    });
});

describe('The CanvasEditor', () => {
    let canvas;
    let canvasEditor;

    beforeEach(() => {
        canvas = Canvas.create(20, 4);
        canvasEditor = new CanvasEditor(canvas);
    });

    afterEach(() => {
        canvas = null;
        canvasEditor = null;
    });

    it('should draw horizontal lines onto the canvas when given coordinates in ascending order', () => {
        canvasEditor.drawLine(canvas,1, 2, 6, 2);
        // Test that each position of the line has been filled
        for (let i = 1; i <= 6; i++) {
            expect(canvas.getCellContent(i, 2)).toBe('x');
        }
    });

    it('should draw horizontal lines onto the canvas when given coordinates in descending order', () => {
        canvasEditor.drawLine(canvas,6, 2, 1, 2);
        // Test that each position of the line has been filled
        for (let i = 1; i <= 6; i++) {
            expect(canvas.getCellContent(i, 2)).toBe('x');
        }
    });

    it('should draw vertical lines onto the canvas when given coordinates in ascending order', () => {
        canvasEditor.drawLine(canvas, 6, 3, 6, 4);
        expect(canvas.getCellContent(6, 3)).toBe('x');
        expect(canvas.getCellContent(6, 4)).toBe('x');
    });

    it('should draw vertical lines onto the canvas when given coordinates in descending order', () => {
        canvasEditor.drawLine(canvas, 6, 4, 6, 3);
        expect(canvas.getCellContent(6, 3)).toBe('x');
        expect(canvas.getCellContent(6, 4)).toBe('x');
    });

});

describe('The CanvasEditor', () => {
    let canvas;
    let canvasEditor;

    beforeEach(() => {
        canvas = Canvas.create(20, 4);
        canvasEditor = new CanvasEditor(canvas);
    });

    afterEach(() => {
        canvas = null;
        canvasEditor = null;
    });

    it('should draw rectangles onto the canvas when given coordinates in ascending order', () => {
        const drawLine = jest.spyOn(canvasEditor, "drawLine");

        canvasEditor.drawRectangle(canvas, 14, 1, 18, 3);
        expect(drawLine).toHaveBeenNthCalledWith(1, canvas, 14, 1, 14, 3);
        expect(drawLine).toHaveBeenNthCalledWith(2, canvas, 14, 3, 18, 3);
        expect(drawLine).toHaveBeenNthCalledWith(3, canvas, 18, 3, 18, 1);
        expect(drawLine).toHaveBeenNthCalledWith(4, canvas, 18, 1, 14, 1);
        expect(drawLine).toHaveBeenCalledTimes(4);

        // Check the corners assuming everything in between has been correctly written assuming drawLine is called correctly
        expect(canvas.getCellContent(14, 1)).toBe('x');
        expect(canvas.getCellContent(14, 3)).toBe('x');
        expect(canvas.getCellContent(18, 3)).toBe('x');
        expect(canvas.getCellContent(18, 1)).toBe('x');

    });

    it('should draw rectangles onto the canvas when given coordinates in descending order', () => {
        const drawLine = jest.spyOn(canvasEditor, "drawLine");

        canvasEditor.drawRectangle(canvas, 18, 3, 14, 1);
        expect(drawLine).toHaveBeenNthCalledWith(1, canvas, 18, 3, 18, 1);
        expect(drawLine).toHaveBeenNthCalledWith(2, canvas, 18, 1, 14, 1);
        expect(drawLine).toHaveBeenNthCalledWith(3, canvas, 14, 1, 14, 3);
        expect(drawLine).toHaveBeenNthCalledWith(4, canvas, 14, 3, 18, 3);
        expect(drawLine).toHaveBeenCalledTimes(4);

        // Check the corners assuming everything in between has been correctly written assuming drawLine is called correctly
        expect(canvas.getCellContent(14, 1)).toBe('x');
        expect(canvas.getCellContent(14, 3)).toBe('x');
        expect(canvas.getCellContent(18, 3)).toBe('x');
        expect(canvas.getCellContent(18, 1)).toBe('x');
    })
});

describe('The CanvasEditor', () => {
    let canvas;
    let canvasEditor;

    beforeEach(() => {
        canvas = Canvas.create(20, 4);
        canvasEditor = new CanvasEditor(canvas);
    });

    afterEach(() => {
        canvas = null;
        canvasEditor = null;
    });

    it('should fill canvas with no empty areas', () => {
        const setCellContent = jest.spyOn(canvas, "setCellContent");

        canvasEditor.bucketFill(canvas, 10, 3, 'o');
        // expect it to be called 80 times because there's 20 x 4 = 80 cells to be filled.
        expect(setCellContent).toHaveBeenCalledTimes(80);
    });

    // wont fill diagonals

    // replace existing with new user specified

    // will wrap around lines

    // will stop at borders


});
