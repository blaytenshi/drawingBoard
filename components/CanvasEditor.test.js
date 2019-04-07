const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const InvalidLineError = require('../exceptions/InvalidLineError');
const CoordinatesOutOfBoundsError = require('../exceptions/CoordinatesOutOfBoundsError');
const InvalidCanvasDimensionsError = require('../exceptions/InvalidCanvasDimensionsError');
const CanvasNotInitializedError = require('../exceptions/CanvasNotInitializedError');

describe('The CanvasEditor', () => {
    let canvas;
    let canvasEditor;

    beforeAll(() => {
        canvas = Canvas.create(10,12);
        canvasEditor = new CanvasEditor(canvas);
    });

    it('should throw InvalidCanvasDimensionsError when attempting to draw line on non-existant canvas', () => {
        expect(() => {
            canvasEditor.drawLine(undefined, 5, 10, 10, 10);
        }).toThrow(CanvasNotInitializedError);
    });

    it('should throw InvalidLineError when given coordinates doesn\'t cannot create horizontal or vertical line', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 1, 1, 3, 3)
        }).toThrow(InvalidLineError);
    });

    it('should throw CoordinateOutOfBounds error when coordinates to create horizontal lines but first set are out of bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, -1, 5, 20, 5);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw CoordinateOutOfBounds error when coordinates to create horizontal lines but second set are out of bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 1, 5, 20, 5);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw CoordinateOutOfBounds error when coordinates create vertical lines but first set are out of bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 5, -1, 5, 20);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw CoordinateOutOfBounds error when coordinates create vertical lines but second set are out of bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 5, 1, 5, 20);
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw InvalidCanvasDimensionsError when attempting to draw rectangle on non-existant canvas', () => {
        expect(() => {
            canvasEditor.drawRectangle(undefined, 5, 5, 10, 10);
        }).toThrow(CanvasNotInitializedError);
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
            canvasEditor.bucketFill(canvas, 15, 15, 'o');
        }).toThrow(CoordinatesOutOfBoundsError);
    });

    it('should throw InvalidCanvasDimensionsError when attempting to bucket fill on non-existant canvas', () => {
        expect(() => {
            canvasEditor.bucketFill(undefined, 10, 3, 'o')
        }).toThrow(CanvasNotInitializedError);
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
        canvas = Canvas.create(5, 5);
        canvasEditor = new CanvasEditor(canvas);
    });

    afterEach(() => {
        canvas = null;
        canvasEditor = null;
    });

    it('should fill canvas with no empty areas', () => {
        const setCellContent = jest.spyOn(canvas, "setCellContent");

        canvasEditor.bucketFill(canvas, 3, 3, 'o');
        // expect it to be called 80 times because there's 5 x 5 = 25 cells to be filled.
        expect(setCellContent).toHaveBeenCalledTimes(25);
        // for loop to check each of the 25 cell is filled with 'o'
        for (let y = 1; y <= canvas.getHeight(); y++) {
            for (let x = 1; x <= canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('o');
            }
        }
    });

    it('should not fill diagonally adjacent cells', () => {
        // manually create a diagonal line
        canvas.setCellContent(1, 1, 'x');
        canvas.setCellContent(2, 2, 'x');
        canvas.setCellContent(3, 3, 'x');
        canvas.setCellContent(4, 4, 'x');
        canvas.setCellContent(5, 5, 'x');

        canvasEditor.bucketFill(canvas,3, 3, 'p');

        expect(canvas.getCellContent(1, 1)).toBe('x');
        expect(canvas.getCellContent(2, 2)).toBe('x');
        expect(canvas.getCellContent(3, 3)).toBe('p');
        expect(canvas.getCellContent(4, 4)).toBe('x');
        expect(canvas.getCellContent(5, 5)).toBe('x');
    });

    // replace existing with new user specified
    it('should replace existing filled areas with user specified fill value', () => {
        // bisect the canvas in half horizontally
        canvasEditor.drawLine(canvas, 1, 3, 5, 3, 'x');

        // set up spy so we can verify cell content is being set
        const setCellContentSpy = jest.spyOn(canvas, "setCellContent");

        // bucket fill top half and check
        canvasEditor.bucketFill(canvas, 3, 2, 'o');
        expect(setCellContentSpy).toHaveBeenCalledTimes(10);
        for (let y = 1; y <= 2; y++) {
            for (let x = 1; x < canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('o');
            }
        }
        setCellContentSpy.mockClear();

        // bucket fill top half again and check
        canvasEditor.bucketFill(canvas, 3, 2, 'f');
        expect(setCellContentSpy).toHaveBeenCalledTimes(10);
        for (let y = 1; y <= 2; y++) {
            for (let x = 1; x < canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('f');
            }
        }
        setCellContentSpy.mockClear();

        // bucket fill middle of original line and check previously filled area plus filled line
        canvasEditor.bucketFill(canvas, 3, 3, 'f');
        expect(setCellContentSpy).toHaveBeenCalledTimes(5);
        for (let y = 1; y <= 3; y++) {
            for (let x = 1; x < canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('f');
            }
        }
        setCellContentSpy.mockClear();
    });

    it('should fill around lines', () => {
        // draw line with two gaps at the end
        canvasEditor.drawLine(canvas, 2, 3, 4, 3);

        const setCellContentSpy = jest.spyOn(canvas, "setCellContent");

        canvasEditor.bucketFill(canvas, 1,1, '#');
        expect(setCellContentSpy).toHaveBeenCalledTimes(22);
        expect(canvas.getCellContent(1, 3)).toBe('#');
        expect(canvas.getCellContent(5, 3)).toBe('#');
        for (let y = 1; y <= 2; y++) {
            for (let x = 1; x < canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('#');
            }
        }
        for (let y = 4; y <= 5; y++) {
            for (let x = 1; x < canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('#');
            }
        }
    })


});
