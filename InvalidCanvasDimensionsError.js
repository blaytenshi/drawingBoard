class InvalidCanvasDimensionsError extends Error {
    constructor(message, width, height) {
        super(`${message}: { width: ${width}, height: ${height} }`);
        this.name = 'InvalidCanvasDimensionsError';
    }
}
module.exports = InvalidCanvasDimensionsError;
