const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const Coordinate = require('./Coordinate');
const Renderer = require('./Renderer');

describe('The CanvasEditor', () => {
    let canvas;
    let renderer;
    let canvasEditor;
    let coordinate1;
    let coordinate2;
    let coordinate3;

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

    test('blah', () => {
        canvasEditor.drawLine(coordinate2, coordinate3);
        renderer.render();
    })
});
