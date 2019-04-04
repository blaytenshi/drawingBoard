class InvalidCommandError extends Error {
    constructor(message, opString) {
        super(`${message}: { ${opString} }`);
        this.name = "InvalidCommandError";
    }
}

module.exports = InvalidCommandError;
