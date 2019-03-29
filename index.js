const Canvas = require('./Canvas');
const Renderer = require('./Renderer');
const Coordinate = require('./Coordinate');
const CanvasEditor = require('./CanvasEditor');

const canvas = new Canvas(10, 12);
const coordinate1 = new Coordinate(55, 55);
const coordinate2 = new Coordinate(55, 100);
const coordinate3 = new Coordinate(10, 10);
const canvasEditor = new CanvasEditor(canvas);
const renderer = new Renderer(canvas);

canvasEditor.drawLine(coordinate1, coordinate2);
canvasEditor.drawLine(coordinate2, coordinate3);
renderer.render();
