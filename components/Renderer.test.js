const Canvas = require('./Canvas');
const Renderer = require('./Renderer');

// required when mocking Node's core modules. See: 'https://jestjs.io/docs/en/manual-mocks'
jest.mock('process');

describe('The Renderer', () => {
    let renderer = null;
    let canvas = null;

    // beforeAll(() => {
    //     // syntactic sugar version
    //     const spy = jest.spyOn(process.stdout, "write").mockImplementation((data) => {
    //         console.log(data)
    //     });
    //
    //     canvas = new Canvas(1, 1);
    //     renderer = new Renderer(process.stdout);
    // });

    beforeAll(() => {
        // sugar free version
        const originalWrite = process.stdout.write;

        process.stdout.write = jest.fn(originalWrite);

        process.stdout.write.mockImplementation((data) => {
            console.log(data);
        });

        canvas = new Canvas(1, 1);
        renderer = new Renderer(process.stdout);
    });

    // test('blah', () => {
    //     expect(true).toBe(true);
    // });
    test('should render the given canvas', () => {
        renderer.render(canvas);
    })
});
