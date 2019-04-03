const Canvas = require('./Canvas');

describe('The canvas', () => {
    let canvas = null;

    beforeAll(() => {
        canvas = Canvas.create(10, 5);
    });

    test('should create a canvas object', () => {
        expect(canvas._width).toBe(10);
        expect(canvas._height).toBe(5);
    });

    test('should be able to retrieve canvas width', () => {
        expect(canvas.getWidth()).toBe(10);
    });

    test('should be able to retrieve canvas height', () => {
        expect(canvas.getHeight()).toBe(5);
    });

    test('should return content of a cell with given coordinates', () => {
        expect(canvas.getCellContent(1, 1)).toBe(' ');
    });

    test('should set conent of a cell with given coordinates', () => {
        canvas.setCellContent(1, 1, 'x');
        expect(canvas.getCellContent(1, 1)).toBe('x');
    });

});

