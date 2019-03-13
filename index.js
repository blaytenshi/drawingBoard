const Canvas = require('./Canvas');
const Renderer = require('./Renderer');

const canvas = new Canvas(20, 4);
const renderer = new Renderer(canvas);

renderer.render();
