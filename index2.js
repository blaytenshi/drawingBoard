const { run, handleLine, exit } = require('./index');
const CanvasEditor = require('./components/CanvasEditor');
const Renderer = require('./components/Renderer');
const readLine = require('readline');

// jest.mock('process');
// jest.mock('readline');
const input = process.stdin;
const output = process.stdout;

const rl = readLine.createInterface({
    input: input,
    output: output,
    prompt: 'enter command: '
});

const canvasEditor = new CanvasEditor();
const renderer = new Renderer(output);

describe('When run is called', () => {

    // afterAll(() => {
    //     writeMock.mockRestore();
    //     exitMock.mockRestore();
    // });

    // beforeEach(() => {
    //     run(rl, handleLine, exitMock);
    // });
    //
    // afterEach(() => {
    //     writeMock.mockClear();
    // });

    // it('should initially print "enter command: "', () => {
    //     expect(writeMock).toHaveBeenNthCalledWith(1, 'enter command: ');
    // });
    //
    // it('should print errors when an an exception is thrown', () => {
    //     rl.write('a 5 5\n');
    //     expect(writeMock).toHaveBeenNthCalledWith(2, 'Input command is malformed. Please check your inputs!: { a 5 5 }')
    // });

    it('should quit when the quit command entered', () => {
        // const writeMock = jest.spyOn(process.stdout, "write").mockImplementation(data => { return data });
        const mockExit = jest.fn(() => { console.log('mock exiting') });

        run(rl, handleLine, canvasEditor, renderer, mockExit);

        rl.write('q\n');

        expect(mockExit).toHaveBeenCalled(); // <-- FAILING IN TESTS FOR SOME REASON AND CAUSES TEST TO NOT END!
    });
});
