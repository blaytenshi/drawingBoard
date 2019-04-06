const { run, exit } = require('./index');
const readLine = require('readline');

jest.mock('process');
// jest.mock('readline');

describe('When run is called', () => {

    let rl;
    let writeMock;
    let exitMock;

    beforeAll(() => {
        rl = readLine.createInterface({ input: process.stdin, output: process.stdout, prompt: 'enter command: ' });
        writeMock = jest.spyOn(process.stdout, "write").mockImplementation(data => { return data });
        exitMock = jest.fn(() => { return 0 });
    });

    afterAll(() => {
        writeMock.mockRestore();
        exitMock.mockRestore();
    });

    beforeEach(() => {
        run(rl, exitMock);
    });

    afterEach(() => {
        writeMock.mockClear();
    });

    it('should initially print "enter command: "', () => {
        expect(writeMock).toHaveBeenNthCalledWith(1, 'enter command: ');
    });

    it('should print errors when an an exception is thrown', () => {
        rl.write('a 5 5\n');
        expect(writeMock).toHaveBeenNthCalledWith(2, 'Input command is malformed. Please check your inputs!: { a 5 5 }')
    });

    it('should quit when the quit command entered', () => {
        rl.write('q\n');

        expect(exitMock).toHaveBeenCalled(); // <-- FAILING IN TESTS FOR SOME REASON AND CAUSES TEST TO NOT END!
    });
});
