const handleLine = require('./index');
const Canvas = require('./components/Canvas');
const CanvasEditor = require('./components/CanvasEditor');
const Renderer = require('./components/Renderer');

describe('The handleLine function', () => {
    let canvas;
    const renderer = new Renderer(process.stdout);
    const canvasEditor = new CanvasEditor();

    it('should return an empty canvas when given line is c 20 4', () => {
        handleLine('c 20 4', canvas, renderer, canvasEditor);
    })

    
});
