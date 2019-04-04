const Command = require('./Command');
const InvalidCommandError = require('./InvalidCommandError');

describe('A valid command string', () => {
    it('should return a valid canvas command', () => {
        const command = new Command('C 20 20');
        expect(command.getOperation()).toBe("C");
        expect(command.getX1()).toBe(20);
        expect(command.getY1()).toBe(20);
        expect(command.getX2()).toBe(undefined);
        expect(command.getY2()).toBe(undefined);
        expect(command.getFillValue()).toBe(undefined);
    });

    it('should return a valid draw line command', () => {
        const command = new Command('l 6 3 6 4');
        expect(command.getOperation()).toBe("L");
        expect(command.getX1()).toBe(6);
        expect(command.getY1()).toBe(3);
        expect(command.getX2()).toBe(6);
        expect(command.getY2()).toBe(4);
        expect(command.getFillValue()).toBe(undefined);
    });

    it('should return a valid draw rectangle command', () => {
        const command = new Command('R 14 1 18 3');
        expect(command.getOperation()).toBe("R");
        expect(command.getX1()).toBe(14);
        expect(command.getY1()).toBe(1);
        expect(command.getX2()).toBe(18);
        expect(command.getY2()).toBe(3);
        expect(command.getFillValue()).toBe(undefined);
    });

    it('should return a valid bucket fill command', () => {
        const command = new Command('b 5 3 ow');
        expect(command.getOperation()).toBe("B");
        expect(command.getX1()).toBe(5);
        expect(command.getY1()).toBe(3);
        expect(command.getX2()).toBe(undefined);
        expect(command.getY2()).toBe(undefined);
        expect(command.getFillValue()).toBe("o");
    });

    it('should return a valid quit command', () => {
        const command = new Command('q');
        expect(command.getOperation()).toBe("Q");
        expect(command.getX1()).toBe(undefined);
        expect(command.getY1()).toBe(undefined);
        expect(command.getX2()).toBe(undefined);
        expect(command.getY2()).toBe(undefined);
        expect(command.getFillValue()).toBe(undefined);
    })
});

describe('A command string with incorrect operation letter', () => {
    it('should throw InvalidCommandError', () => {
        expect(() => {
            new Command('V 20 20')
        }).toThrow(InvalidCommandError);
    })
});

// this test can also be looked at for people who try to input hexadecimals as numeric coordinates.
// Due to the nature of Number.isNaN(), it won't try to coerce the value (in this case, the a and f) from hex to a number
// before checking for whether the value is a number or not.
describe('A command string with correct operation letter and non-numeric coordinates', () => {
    it('should throw InvalidCommandError', () => {
        expect(() => {
            new Command('C a f')
        }).toThrow(InvalidCommandError);
    })
});

describe('A command string with correct operation letter and empty coordinates', () => {
    it('should throw InvalidCommandError', () => {
        expect(() => {
            new Command(' c  ')
        }).toThrow(InvalidCommandError);
    })
});

// the nature of parseInt() will basically Math.floor() the value of any decimal.
describe('A command string with correct operation letter and decimal coordinates', () => {
    it('should return a floored value of the decimal', () => {
        const command = new Command('c 19.9 20');
        expect(command.getX1()).toBe(19);
        expect(command.getY1()).toBe(20);
    })
});
