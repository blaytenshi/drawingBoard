const Coordinate = require('./Coordinate');
const InvalidCoordinateError = require('./InvalidCoordinateError');

describe('A valid coordinate', () => {
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

describe('An invalid coordinate', () => {
    it('should throw InvalidCoordinateError', () => {
        expect(() => {
            new Coordinate(-1, -1)
        }).toThrow(InvalidCoordinateError);
    });

    it('should throw InvalidCoordinateError when passed non-numeric values', () => {
        expect(() => {
            new Coordinate("4", "5")
        }).toThrow(InvalidCoordinateError);
    });
});
