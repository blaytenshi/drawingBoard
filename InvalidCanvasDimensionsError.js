class InvalidCanvasDimensionsError extends Error {
    constructor(message) {
        super(`${message}`);
        this.name = 'InvalidCanvasDimensionsError';
    }
}
module.exports = InvalidCanvasDimensionsError;
