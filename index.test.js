const handleLine = require('./index');
const Canvas = require('./components/Canvas');
const CanvasEditor = require('./components/CanvasEditor');
const Renderer = require('./components/Renderer');
const CanvasNotInitializedError = require('./exceptions/CanvasNotInitializedError');

jest.mock('process');

describe('The handleLine function', () => {

    let canvas;

    const originalStdoutWrite = process.stdout.write;
    process.stdout.write = jest.fn(originalStdoutWrite);
    /* just to stop it from writing to terminal messing up our test terminal */
    process.stdout.write.mockImplementation((data) => { return data });

    const renderer = new Renderer(process.stdout);
    const canvasEditor = new CanvasEditor();

    it('should create an empty canvas', () => {
        canvas = handleLine('c 6 6', canvas, renderer, canvasEditor);
        // verify canvas is created
        expect(canvas.getWidth()).toBe(6);
        expect(canvas.getHeight()).toBe(6);
    });

    it('should add a horizontal line to existing canvas', () => {
        canvas = handleLine('l 1 3 3 3', canvas, renderer, canvasEditor);

        // verify horizontal line is in the canvas
        for (let x = 1; x <= 3; x++) {
            expect(canvas.getCellContent(x, 3)).toBe('x');
        }
    });

    it('should add a vertical line to existing canvas', () => {
        canvas = handleLine('l 3 3 3 1', canvas, renderer, canvasEditor);

        // verify vertical line is in the canvas
        for (let y = 1; y <= 3; y++) {
            expect(canvas.getCellContent(3, y)).toBe('x');
        }
    });

    it('should add a rectangle to existing canvas', () => {
        canvas = handleLine('r 4 1 6 3', canvas, renderer, canvasEditor);

        // verify rectangle is in the canvas
        // rectangle top and bottom
        for (let x = 4; x <= 6; x++) {
            expect(canvas.getCellContent(x, 1)).toBe('x');
            expect(canvas.getCellContent(x, 3)).toBe('x');
        }
        // rectangle sides
        expect(canvas.getCellContent(4, 2)).toBe('x');
        expect(canvas.getCellContent(6, 2)).toBe('x');
    });

    it('should bucket fill onto specified area with user specified value', () => {
        canvas = handleLine('b 1 4 o', canvas, renderer, canvasEditor);

        // verify all cells that have been filled in
        for (let y = 4; y <= canvas.getHeight(); y++) {
            for (let x = 1; x <= canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('o')
            }
        }
    });

    // quit - expect it to call rl.close()
});

// create canvas with 0 width 0 height

// attempt to draw non-horizontal/non-vertical line

// draw horizontal line with no canvas
describe('The handleLine function', () => {

    let canvas;

    const originalStdoutWrite = process.stdout.write;
    process.stdout.write = jest.fn(originalStdoutWrite);
    /* just to stop it from writing to terminal messing up our test terminal */
    process.stdout.write.mockImplementation((data) => { return data });

    const renderer = new Renderer(process.stdout);
    const canvasEditor = new CanvasEditor();

    it('should throw CanvasNotInitializedError when attempting to draw line on uninitialized canvas.', () => {
        expect(() => {
            handleLine('l 1 3 3 3', canvas, renderer, canvasEditor)
        }).toThrow(CanvasNotInitializedError)
    });

});

// draw vertical line with no canvas

// draw rectangle with no canvas

// bucket fill with no canvas

// bucket fill a line

// bucket fill over a bucket fill

// will not bucket fill items diagonal

// command with no matching command letter

// command with matching lower case command letter

// command with missing parameter

// command with leading space

// command with trailing space

// command with extra space in between coordinate

// bucket fill command with bucket fill value of more than one letter
