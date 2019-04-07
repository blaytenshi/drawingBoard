const { run, exit } = require('./index');
const Canvas = require('./components/Canvas');
const CanvasEditor = require('./components/CanvasEditor');
const Renderer = require('./components/Renderer');
const Readline = require('readline');

jest.mock('process');

let renderer;
let canvasEditor;
let readline;
let mockExit;
let mockStdoutWrite;
let originalStdoutWrite;

describe('When the application is run', () => {
    beforeAll(() => {
        readline = Readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'enter command: '
        });

        mockStdoutWrite = jest.spyOn(process.stdout, "write").mockImplementation(data => { return data });

        mockExit = jest.fn(() => { return 0 });

        canvasEditor = new CanvasEditor();
        renderer = new Renderer(process.stdout);
    });

    beforeEach(() => {
        run(readline, canvasEditor, renderer, exit);
    });

    it('should display error message when attempting to create canvas with width 0 and height 0', () => {
        readline.write('c 0 0\n');

        expect(mockStdoutWrite).toHaveBeenNthCalledWith(1, 'enter command: ');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(2, 'Canvas dimensions cannot be less than 1. { W: 0, H: 0 }');
    });

    it('should create an empty canvas', () => {
        readline.write('c 1 1\n');

        expect(mockStdoutWrite).toHaveBeenNthCalledWith(1, 'enter command: ');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(2, '---');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(3, '\n');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(4, '|');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(5, ' ');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(6, '|\n');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(7, '---');
        expect(mockStdoutWrite).toHaveBeenNthCalledWith(8, '\n\n');
    });

    it('should draw a horizontal line on the canvas', () => {
        readline.write('c 5 5');

        // can't call this second line? need to wait?
        readline.write('l 1 1 5 1');

        expect(mockStdoutWrite).toHaveBeenNthCalledWith(12, '');

    });

    afterEach(() => {
        mockStdoutWrite.mockClear();
    })

});

describe('When the application is run', () => {
    it('should quit when the user attempts to enter a q command', () => {
        run(readline, canvasEditor, renderer, mockExit);

        readline.write('q\n');

        expect(mockExit).toHaveBeenCalled();
    })
});
