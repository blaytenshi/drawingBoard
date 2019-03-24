const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const Coordinate = require('./Coordinate');

describe('The CanvasEditor', () => {
    let canvas;
    let canvasEditor;
    let coordinate1;
    let coordinate2;
    let coordinate3;

    beforeAll(() => {
        canvas = new Canvas(10,12);
        canvasEditor = new CanvasEditor(canvas);
        coordinate1 = new Coordinate(5, 5);
        coordinate2 = new Coordinate(5, 10);
        coordinate3 = new Coordinate(10, 10);
    });

    test('should return true when coordinates points are straight', () => {
        expect(canvasEditor.isStraight(coordinate1, coordinate2)).toBe(true);
    });

    test('should return false when coordinates points are not straight', () => {
        expect(canvasEditor.isStraight(coordinate1, coordinate3)).toBe(false);
    });
});
