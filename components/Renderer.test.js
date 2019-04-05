const Canvas = require('./Canvas');
const Renderer = require('./Renderer');

describe('The Renderer', () => {
    let renderer = null;
    let canvas = null;

    beforeAll(() => {
        canvas = new Canvas(5, 5);
        renderer = new Renderer(process.stdout);
    });

    test('blah', () => {
        expect(true).toBe(true);
    });
    // test('should render the given canvas', () => {
    //     expect(renderer.render(canvas)).toHaveBeenCalled();
    // })
});
