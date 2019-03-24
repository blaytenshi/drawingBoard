const Coordinate = require('./Coordinate');

describe('The coordinate', () => {
    let coordinate = null;

    beforeAll(() => {
        coordinate = new Coordinate(8, 10);
    });

    test('should create a coordinate object', () => {
        expect(coordinate._x).toBe(8);
        expect(coordinate._y).toBe(10);
    });

    test('should return the x value of the coordinate object', () => {
        expect(coordinate.getX()).toBe(8);
    });

    test('should return the y value of the coordinate object', () => {
        expect(coordinate.getY()).toBe(10);
    });
});
