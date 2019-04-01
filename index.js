const Canvas = require('./Canvas');
const Renderer = require('./Renderer');
const Coordinate = require('./Coordinate');
const CanvasEditor = require('./CanvasEditor');

let canvas = null;
const canvasEditor = new CanvasEditor(canvas);
if (true) {
    canvas = new Canvas(10, 12);
}
const coordinate1 = new Coordinate(5, 5);
const coordinate2 = new Coordinate(5, 10);
const coordinate3 = new Coordinate(10, 10);
const renderer = new Renderer(process.stdout);

canvasEditor.drawLine(coordinate1, coordinate2);
canvasEditor.drawLine(coordinate2, coordinate3);
renderer.render(canvas);
