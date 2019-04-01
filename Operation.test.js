const Operation = require('./Command');

describe('A draw canvas operation', () => {
    it('should return a draw canvas operation', () => {
        const operation = new Operation('C 10 20');

        expect(operation._operation).toBe('C');
        expect(operation._coordinateX1).toBe('10');
        expect(operation._coordinateY1).toBe('20');
        expect(operation._coordinateX2).toBe(undefined);
        expect(operation._coordinateY2).toBe(undefined);
    });
});

describe('A draw line operation', () => {
    it('should return a draw line operation', () => {
        const operation = new Operation('L 1 2 6 2');

        expect(operation._operation).toBe('L');
        expect(operation._coordinateX1).toBe('1');
        expect(operation._coordinateY1).toBe('2');
        expect(operation._coordinateX2).toBe('6');
        expect(operation._coordinateY2).toBe('2');
    });
});

describe('An invalid operation', () => {
    it('should throw Invalid Operation Error', () => {
        const operation = new Operation('');
        expect()
    })
});
