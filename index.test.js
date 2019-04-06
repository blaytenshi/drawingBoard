const { handleLine } = require('./index');
const Canvas = require('./components/Canvas');
const CanvasEditor = require('./components/CanvasEditor');
const Renderer = require('./components/Renderer');
const CanvasNotInitializedError = require('./exceptions/CanvasNotInitializedError');
const InvalidCanvasDimensionsError = require('./exceptions/InvalidCanvasDimensionsError');

jest.mock('process');

let renderer;
let canvasEditor;

beforeAll(() => {
    const originalStdoutWrite = process.stdout.write;
    process.stdout.write = jest.fn(originalStdoutWrite);
    /* just to stop it from writing to terminal messing up our test terminal */
    process.stdout.write.mockImplementation((data) => { return data });

    renderer = new Renderer(process.stdout);
    canvasEditor = new CanvasEditor();
});

// afterAll(() => {
//
// });

describe('The handleLine function', () => {

    let canvas;

    it('should display error message when attempting to create canvas with width 0 and height 0', () => {
        expect(() => {
            handleLine('c 0 0', canvas, renderer, canvasEditor);
        }).toThrow('Canvas dimensions cannot be less than 1. { W: 0, H: 0 }');
    });

    it('should create an empty canvas', () => {
        canvas = handleLine('c 6 6', canvas, renderer, canvasEditor);
        // verify canvas is created
        expect(canvas.getWidth()).toBe(6);
        expect(canvas.getHeight()).toBe(6);
    });

    it('should display error message when attempting to create non-horizontal/non-vertical line', () => {
        expect(() => {
            handleLine('l 1 1 6 6', canvas, renderer, canvasEditor);
        }).toThrow('Given coordinates do not produce a horizontal or vertical line.\nCoordinate1: { X: 1, Y: 1 }\nCoordinate2: { X: 6, Y: 6 }')
    });

    it('should add a horizontal line to existing canvas', () => {
        canvas = handleLine('l 1 3 3 3', canvas, renderer, canvasEditor);

        // verify horizontal line is in the canvas
        for (let x = 1; x <= 3; x++) {
            expect(canvas.getCellContent(x, 3)).toBe('x');
        }
    });

    // draw line with coordinates out of bounds should throw error
    it('should display error message when attempting to draw horizontal line with first coordinate out of bounds', () => {
        expect(() => {
            handleLine('l -1 6 6 6', canvas, renderer, canvasEditor);
        }).toThrow('Coordinates are not within Canvas bounds.\nCoordinate: { X: -1, Y: 6 }\nCanvas Boundaries: { W: 6, H: 6 }')
    });

    it('should display error message when attempting to draw horizontal line with second coordinate out of bounds', () => {
        expect(() => {
            handleLine('l 1 6 7 6', canvas, renderer, canvasEditor);
        }).toThrow('Coordinates are not within Canvas bounds.\nCoordinate: { X: 7, Y: 6 }\nCanvas Boundaries: { W: 6, H: 6 }')
    });

    // bucket fill a line
    it('should bucket fill previously created horizontal line', () => {
        const setCellContentSpy = jest.spyOn(canvas, "setCellContent");

        canvas = handleLine('b 1 3 o', canvas, renderer, canvasEditor);
        expect(setCellContentSpy).toHaveBeenCalledTimes(3);
        setCellContentSpy.mockRestore();

        for (let x = 1; x <= 3; x++) {
            expect(canvas.getCellContent(x, 3)).toBe('o');
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
        const setCellContentSpy = jest.spyOn(canvas, "setCellContent");

        canvas = handleLine('b 1 4 r', canvas, renderer, canvasEditor);
        expect(setCellContentSpy).toHaveBeenCalledTimes(18);
        setCellContentSpy.mockRestore();

        for (let y = 4; y <= canvas.getHeight(); y++) {
            for (let x = 1; x <= canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('r')
            }
        }
    });

    it('should display error message when attempting to draw rectangle with first coordinate out of bounds', () => {
        expect(() => {
            handleLine('r 4 -1 6 3', canvas, renderer, canvasEditor);
        }).toThrow('Coordinates are not within Canvas bounds.\nCoordinate: { X: 4, Y: -1 }\nCanvas Boundaries: { W: 6, H: 6 }')
    });

    it('should display error message when attempting to draw rectangle with second coordinate out of bounds', () => {
        expect(() => {
            handleLine('r 4 1 7 3', canvas, renderer, canvasEditor);
        }).toThrow('Coordinates are not within Canvas bounds.\nCoordinate: { X: 7, Y: 3 }\nCanvas Boundaries: { W: 6, H: 6 }')
    });

    it('should bucket fill over area that is already bucket filled with user specified value', () => {
        const setCellContentSpy = jest.spyOn(canvas, "setCellContent");

        handleLine('b 1 4 #', canvas, renderer, canvasEditor);
        expect(setCellContentSpy).toHaveBeenCalledTimes(18);
        setCellContentSpy.mockRestore();

        for (let y = 4; y <= canvas.getHeight(); y++) {
            for (let x = 1; x <= canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('#')
            }
        }
    });

    it('should bucket fill with first character of the user specified character fill value', () => {
        const setCellContentSpy = jest.spyOn(canvas, "setCellContent");

        handleLine('b 1 4 *$', canvas, renderer, canvasEditor);
        expect(setCellContentSpy).toHaveBeenCalledTimes(18);
        setCellContentSpy.mockRestore();

        for (let y = 4; y <= canvas.getHeight(); y++) {
            for (let x = 1; x <= canvas.getWidth(); x++) {
                expect(canvas.getCellContent(x, y)).toBe('*')
            }
        }
    });

    it('should display error message when attempting to bucket fill with coordinate out of bounds', () => {
        expect(() => {
            handleLine('b 7 7 o', canvas, renderer, canvasEditor);
        }).toThrow('Coordinates are not within Canvas bounds.\nCoordinate: { X: 7, Y: 7 }\nCanvas Boundaries: { W: 6, H: 6 }')
    });

    // quit - expect it to call rl.close()
});

describe('When the handleLine function is called without a canvas initialized', () => {

    let canvas;

    it('should display CanvasNotInitializedError error message when attempting to draw horizontal line.', () => {
        expect(() => {
            handleLine('l 1 3 3 3', canvas, renderer, canvasEditor)
        }).toThrow('Canvas has not been initialized! Please first create a canvas!')
    });

    it('should display CanvasNotInitializedError error message when attempting to draw vertical line.', () => {
        expect(() => {
            handleLine('l 3 3 3 1', canvas, renderer, canvasEditor);
        }).toThrow('Canvas has not been initialized! Please first create a canvas!')
    });

    it('should display CanvasNotInitializedError error message when attempting to draw rectangle.', () => {
        expect(() => {
            handleLine('r 2 2 4 4', canvas, renderer, canvasEditor);
        }).toThrow('Canvas has not been initialized! Please first create a canvas!')
    });

    it('should display CanvasNotInitializedError error message when attempting to bucket fill.', () => {
        expect(() => {
            handleLine('b 3 3 o', canvas, renderer, canvasEditor);
        }).toThrow('Canvas has not been initialized! Please first create a canvas!')
    });
});

describe('When the handLine function is called with erroneous input', () => {
    let canvas;

    beforeEach(() => {
        canvas = handleLine('c 6 6', canvas, renderer, canvasEditor);
    });

    it('should display InvalidCommandError when there is no matching operation letter', () => {
        expect(() => {
            handleLine('i 1 3 3 3', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { i 1 3 3 3 }')
    });

    it('should display InvalidCommandError when draw line command has missing values for coordinates', () => {
        expect(() => {
            handleLine('l 1 3 3', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { l 1 3 3 }')
    });

    it('should display InvalidCommandError when draw rectangle command has missing values for coordinates', () => {
        expect(() => {
            handleLine('r 2 2 4', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { r 2 2 4 }')
    });

    it('should display InvalidCommandError when draw bucket fill command has missing values for coordinates', () => {
        expect(() => {
            handleLine('b 2 o', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { b 2 o }')
    });

    it('should display InvalidCommandError when draw bucket fill command has missing user specified fill value', () => {
        expect(() => {
            handleLine('b 2 4', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { b 2 4 }')
    });

    it('should display InvalidCommandError when draw line command substitutes characters other than numbers for coordinates', () => {
        expect(() => {
            handleLine('l e   # +', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { l e   # + }');
    });

    it('should display InvalidCommandError when draw line command has an extra space in given coordinates', () => {
        expect(() => {
            handleLine('l 1 3  3 3', canvas, renderer, canvasEditor);
        }).toThrow('Input command is malformed. Please check your inputs!: { l 1 3  3 3 }')
    });

    it('should accept valid command with leading and trailing values', () => {
        canvas = handleLine(' c 20 4 ', canvas, renderer, canvasEditor);

        expect(canvas.getWidth()).toBe(20);
        expect(canvas.getHeight()).toBe(4);
    });

    it('should accept operation letters that are capitalised', () => {
        canvas = handleLine('C 4 20', canvas, renderer, canvasEditor);

        expect(canvas.getWidth()).toBe(4);
        expect(canvas.getHeight()).toBe(20);
    })
});
