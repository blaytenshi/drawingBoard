const Canvas = require('./Canvas');
const Renderer = require('./Renderer');

describe('The Renderer', () => {
    let renderer = null;
    let canvas = null;

    beforeAll(() => {
        canvas = new Canvas(5, 5);
        renderer = new Renderer(process.stdout);
    });

    test('should blah', () => {
        expect(renderer.render(canvas)).toHaveBeenCalled();
    })
});
