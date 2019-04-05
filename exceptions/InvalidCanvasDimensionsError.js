class InvalidCanvasDimensionsError extends Error {
    constructor(message, width, height) {
        super(`${message}: { W: ${width}, H: ${height} }`);
        this.name = 'InvalidCanvasDimensionsError';
    }
}
module.exports = InvalidCanvasDimensionsError;
