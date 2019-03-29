const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const Coordinate = require('./Coordinate');
const Renderer = require('./Renderer');
const InvalidLineError = require('./InvalidLineError');

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
    });

    test('should return true when X values of two coordinates are the same', () => {
        expect(canvasEditor.isVertical(coordinate1, coordinate2)).toBe(true);
    });

    test('should return false when X values of two coordinates are not the same', () => {
        expect(canvasEditor.isVertical(coordinate1, coordinate3)).toBe(false);
    });

    test('should return true when Y values of two coordinates are the same', () => {
        expect(canvasEditor.isHorizontal(coordinate2, coordinate3)).toBe(true);
    });

    test('should return false when Y values of two coordinates are not the same', () => {
        expect(canvasEditor.isHorizontal(coordinate1, coordinate3)).toBe(false);
    });

    test('should draw horizontal lines onto the canvas', () => {
        canvasEditor.drawLine(coordinate2, coordinate3);
        expect(canvas.getCellContent(coordinate2.getX(), coordinate3.getY())).toBe('x');
        // the -1 is needed for off-by-one
        expect(canvas.getCellContent(
            coordinate2.getX() + Math.abs(coordinate2.getX() - coordinate3.getX()) - 1,
            coordinate3.getY())
        ).toBe('x');
    });

    test('should draw vertical lines onto the canvas', () => {
        canvasEditor.drawLine(coordinate1, coordinate2);
        expect(canvas.getCellContent(coordinate1.getY(), coordinate2.getY())).toBe('x');
        // the -1 is needed for off-by-one
        expect(canvas.getCellContent(
            coordinate1.getX(),
            coordinate1.getY() + Math.abs(coordinate1.getY() - coordinate2.getY()) - 1)
        ).toBe('x');
    });

    test('should throw error when given coordinates doesn\'t cannot create horizontal or vertical line', () => {
        // since we're testing that the drawLine function actually throws errors with inputs, we must wrap it
        // inside an anonymous functiono when calling the functioon to test
        expect(() => {
            canvasEditor.drawLine(coordinate1, coordinate3)
        }).toThrow(InvalidLineError);
    });

});
