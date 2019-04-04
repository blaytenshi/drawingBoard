const Canvas = require('./Canvas');
const InvalidCanvasDimensionsError = require('./InvalidCanvasDimensionsError');

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

    test('should set content of a cell with given coordinates', () => {
        canvas.setCellContent(1, 1, 'x');
        expect(canvas.getCellContent(1, 1)).toBe('x');
    });

});

describe('A canvas', () => {
    it('should throw InvalidCanvasDimensionsError when a canvas canvas is created with dimensions less than 1', () => {
        expect(() => {
            Canvas.create(0, 0)
        }).toThrow(InvalidCanvasDimensionsError);
    })
})
