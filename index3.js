const CanvasEditor = require('./CanvasEditor');
const Canvas = require('./Canvas');
const Renderer = require('./Renderer');

const renderer = new Renderer(process.stdout);
const canvas = Canvas.create(3, 3);

const canvasEditor = new CanvasEditor();

canvasEditor.bucketFill(canvas, 2, 2, 'o');
renderer.render(canvas);
