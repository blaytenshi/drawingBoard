const OperationType = require('./OperationType');
const InvalidCommandError = require('../exceptions/InvalidCommandError');
const { isNumeric } = require('./Utils');

class Command {
    constructor(opString) {
        const operation = opString.trim().toUpperCase().split(" ");
        if (operation[0] === OperationType.CREATE_CANVAS &&
            isNumeric(operation[1]) &&
            isNumeric(operation[2]) &&
            operation.length === 3) {
                this._operation = operation[0];
                this._coordinateX1 = parseInt(operation[1]);
                this._coordinateY1 = parseInt(operation[2]);
        } else if (operation[0] === OperationType.DRAW_LINE &&
            isNumeric(operation[1]) &&
            isNumeric(operation[2]) &&
            isNumeric(operation[3]) &&
            isNumeric(operation[4]) &&
            operation.length === 5) {
                this._operation = operation[0];
                this._coordinateX1 = parseInt(operation[1]);
                this._coordinateY1 = parseInt(operation[2]);
                this._coordinateX2 = parseInt(operation[3]);
                this._coordinateY2 = parseInt(operation[4]);
        } else if (operation[0] === OperationType.DRAW_RECT &&
            isNumeric(operation[1]) &&
            isNumeric(operation[2]) &&
            isNumeric(operation[3]) &&
            isNumeric(operation[4]) &&
            operation.length === 5) {
                this._operation = operation[0];
                this._coordinateX1 = parseInt(operation[1]);
                this._coordinateY1 = parseInt(operation[2]);
                this._coordinateX2 = parseInt(operation[3]);
                this._coordinateY2 = parseInt(operation[4]);
        } else if (operation[0] === OperationType.BUCKET_FILL &&
            isNumeric(operation[1]) &&
            isNumeric(operation[2]) &&
            operation[3] &&
            operation.length === 4) {
                this._operation = operation[0];
                this._coordinateX1 = parseInt(operation[1]);
                this._coordinateY1 = parseInt(operation[2]);
                this._fillValue = operation[3].substring(0, 1).toLowerCase();
        } else if (operation[0] === OperationType.QUIT && operation.length === 1) {
            this._operation = operation[0];
        } else {
            throw new InvalidCommandError('Input command is malformed. Please check your inputs!', opString);
        }
    }

    getOperation() {
        return this._operation;
    }

    getX1() {
        return this._coordinateX1;
    }

    getY1() {
        return this._coordinateY1;
    }

    getX2() {
        return this._coordinateX2;
    }

    getY2() {
        return this._coordinateY2;
    }

    getFillValue() {
        return this._fillValue;
    }
}

module.exports = Command;
