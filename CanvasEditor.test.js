const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const Coordinate = require('./Coordinate');
const Renderer = require('./Renderer');
const InvalidLineError = require('./InvalidLineError');
const CoordinatesSetOutOfBoundsError = require('./CoordinatesSetOutOfBoundsError');

describe('The CanvasEditor', () => {
    let canvas;
    let renderer;
    let canvasEditor;
    let coordinate1;
    let coordinate2;
    let coordinate3;
    let coordinate4;

    beforeAll(() => {
        canvas = new Canvas(10,12);
        renderer = new Renderer(canvas);
        canvasEditor = new CanvasEditor(canvas);
        coordinate1 = new Coordinate(5, 5);
        coordinate2 = new Coordinate(5, 10);
        coordinate3 = new Coordinate(10, 10);
        coordinate4 = new Coordinate(100, 100);
    });

    test('should throw error when given coordinate set that is out of canvas bounds', () => {
        expect(() => {
            canvasEditor.drawLine(canvas, 5, 5, 100, 100);
        }).toThrow(CoordinatesSetOutOfBoundsError);
    });

    test('should draw horizontal lines onto the canvas', () => {
        canvasEditor.drawLine(canvas,5, 10, 10, 10);
        // Test start of line is filled
        expect(canvas.getCellContent(5, 10)).toBe('x');
        // Test end of line is filled, the -1 is needed for off-by-one
        expect(canvas.getCellContent(10,10)).toBe('x');
    });

    test('should draw vertical lines onto the canvas', () => {
        canvasEditor.drawLine(canvas, 5, 5, 5, 10);
        expect(canvas.getCellContent(5, 5)).toBe('x');
        expect(canvas.getCellContent(5, 10)).toBe('x');
    });

    test('should throw error when given coordinates doesn\'t cannot create horizontal or vertical line', () => {
        // since we're testing that the drawLine function actually throws errors with inputs, we must wrap it
        // inside an anonymous functiono when calling the functioon to test
        expect(() => {
            canvasEditor.drawLine(canvas, 5, 5, 10, 10)
        }).toThrow(InvalidLineError);
    });

});
