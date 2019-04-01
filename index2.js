const readline = require('readline');
const Command = require('./Command');
const Operation = require('./Operation');
const Canvas = require('./Canvas');
const CanvasEditor = require('./CanvasEditor');
const Renderer = require('./Renderer');
const Coordinate = require('./Coordinate');

const input = process.stdin;
const output = process.stdout;

const rl = readline.createInterface({
    input: input,
    output: output,
    prompt: 'enter command: '
});

let canvas = null;
let canvasEditor = null;
const renderer = new Renderer(output);

rl.prompt();

rl.on('line', line => {
    try {

        const command = new Command(line);

        switch(command.getOperation()) {
            case Operation.CREATE_CANVAS:
                console.log("Creating Canvas");
                canvas = new Canvas(command.getX1(), command.getY1());
                renderer.render(canvas);
                break;
            case Operation.DRAW_LINE:
                canvasEditor = new CanvasEditor(canvas);
                canvasEditor.drawLine(
                    new Coordinate(command.getX1(), command.getY1()),
                    new Coordinate(command.getX2(), command.getY2()),
                );
                renderer.render(canvas);
                break;
            case Operation.DRAW_RECT:
                canvasEditor = new CanvasEditor(canvas);
                canvasEditor.drawRectangle(
                    new Coordinate(command.getX1(), command.getY1()),
                    new Coordinate(command.getX1(), command.getY2()),
                    new Coordinate(command.getX2(), command.getY2()),
                    new Coordinate(command.getX2(), command.getY1())
                );
                renderer.render(canvas);
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
