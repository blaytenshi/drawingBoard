const InvalidOperationError = require('./InvalidOperationError');

class Command {
    constructor(opString) {
        const operation = opString.toUpperCase().split(" ");
        if (operation[0] === "C" && operation.length === 3) {
            this._operation = operation[0];
            this._coordinateX1 = parseInt(operation[1]);
            this._coordinateY1 = parseInt(operation[2]);
        } else if (operation[0] === "L" && operation.length === 5) {
            this._operation = operation[0];
            this._coordinateX1 = parseInt(operation[1]);
            this._coordinateY1 = parseInt(operation[2]);
            this._coordinateX2 = parseInt(operation[3]);
            this._coordinateY2 = parseInt(operation[4]);
        } else if (operation[0] === "R" && operation.length === 5) {
            this._operation = operation[0];
            this._coordinateX1 = parseInt(operation[1]);
            this._coordinateY1 = parseInt(operation[2]);
            this._coordinateX2 = parseInt(operation[3]);
            this._coordinateY2 = parseInt(operation[4]);
        } else if (operation[0] === "B" && operation.length === 4) {
            this._operation = operation[0];
            this._coordinateX1 = parseInt(operation[1]);
            this._coordinateX2 = parseInt(operation[2]);
            this._fillValue = parseInt(operation[3]);
        } else if (operation[0] === "Q" && operation.length === 1) {
            this._operation = operation[0];
        } else {
            throw new InvalidOperationError(`Operation is malformed. Please check your inputs! ${opString}`);
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
