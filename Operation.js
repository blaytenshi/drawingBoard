class Operation {
    constructor(opString) {
        const operation = opString.split(" ");
        this._operation = operation[0];
        this._coordinateX1 = operation[1];
        this._coordinateY1 = operation[2];
        this._coordinateX2 = operation[3];
        this._coordinateY2 = operation[4];
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
}

module.exports = Operation;
