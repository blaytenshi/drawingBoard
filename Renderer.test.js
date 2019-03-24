const Renderer = requrie('./Renderer');

describe('The Renderer', () => {
    let renderer = null;
    let canvas = null;

    beforeAll(() => {
        canvas = new Canvas(10, 12);
        renderer = new Renderer(canvas);
    });

});
