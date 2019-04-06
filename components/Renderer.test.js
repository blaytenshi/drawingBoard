const Canvas = require('./Canvas');
const Renderer = require('./Renderer');

// required when mocking Node's core modules. See: 'https://jestjs.io/docs/en/manual-mocks'
jest.mock('process');

describe('The Renderer', () => {
    test('should render given canvas', () => {
        const canvas = Canvas.create(1, 1);
        const renderer = new Renderer(process.stdout);
        // replace usual write function with our own implementation using spyOn()
        const processStdOutWriteSpy = jest.spyOn(process.stdout, "write").mockImplementation((data) => {
            return data;
        });

        renderer.render(canvas);
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(1, '---');
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(2, '\n');
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(3, '|');
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(4, ' ');
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(5, '|\n');
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(6, '---');
        expect(processStdOutWriteSpy).toHaveBeenNthCalledWith(7, '\n\n');
        expect(processStdOutWriteSpy).toHaveBeenCalledTimes(7);

        processStdOutWriteSpy.mockRestore();
    });
});
