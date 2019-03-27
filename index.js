const Canvas = require('./Canvas');
const Renderer = require('./Renderer');
const Coordinate = require('./Coordinate');
const CanvasEditor = require('./CanvasEditor');

const canvas = new Canvas(20, 20);
const coordinate1 = new Coordinate(5, 2);
const coordinate2 = new Coordinate(10, 2);
const coordinate3 = new Coordinate(10, 10);
const canvasEditor = new CanvasEditor(canvas);
const renderer = new Renderer(canvas);

canvasEditor.drawLine(coordinate1, coordinate2);
canvasEditor.drawLine(coordinate2, coordinate3);
renderer.render();
