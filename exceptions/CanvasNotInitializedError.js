class CanvasNotInitializedError extends Error {
    constructor(message) {
        super(`${message}`);
        this.name = 'CanvasNotInitializedError';
    }
}
module.exports = CanvasNotInitializedError;
