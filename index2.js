const readline = require('readline');
const Command = require('./Command');
const Operation = require('./Operation');
const Canvas = require('./Canvas');
const CanvasEditor = require('./CanvasEditor');
const Renderer = require('./Renderer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'enter command: '
});


let canvas = null;
const canvasEditor = new CanvasEditor(canvas);
const renderer = new Renderer();

rl.prompt();

rl.on('line', line => {
    try {

        const command = new Command(line);

        switch(command.getOperation()) {
            case Operation.CREATE_CANVAS:
                console.log("Creating Canvas");
                canvas = new Canvas(command.getX1(), command.getY1());
                renderer.render();
                break;
            case Operation.DRAW_LINE:
                console.log("Drawing Line");
                break;
            case Operation.DRAW_RECT:
                console.log("Drawing Rectangle");
                break;
            case Operation.BUCKET_FILL:
                console.log("Drawing Bucket Fill");
                break;
            case Operation.QUIT:
                rl.close();
                break;
        }
    } catch (e) {
        console.log(e.message);
    }
    rl.prompt();
}).on('close', () => {
    process.exit();
});
