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
let canvasEditor = new CanvasEditor();
const renderer = new Renderer(output);

rl.prompt();

rl.on('line', line => {
    // try {
        const command = new Command(line);

        switch (command.getOperation()) {
            case Operation.CREATE_CANVAS:
                console.log("Creating Canvas");
                canvas = Canvas.create(command.getX1(), command.getY1());
                renderer.render(canvas);
                break;
            case Operation.DRAW_LINE:
                console.log("Drawing Line");
                canvasEditor.drawLine(
                    canvas,
                    command.getX1(), command.getY1(),
                    command.getX2(), command.getY2(),
                );
                renderer.render(canvas);
                break;
            case Operation.DRAW_RECT:
                console.log("Drawing Rectangle");
                canvasEditor.drawRectangle(
                    canvas,
                    command.getX1(), command.getY1(),
                    command.getX2(), command.getY2(),
                );
                renderer.render(canvas);
                break;
            case Operation.BUCKET_FILL:
                console.log("Drawing Bucket Fill");
                canvasEditor.bucketFill(
                    canvas,
                    command.getX1(),
                    command.getY1(),
                    command.getFillValue()
                );
                renderer.render(canvas);
                break;
            case Operation.QUIT:
                rl.close();
                break;
        }
    // } catch (e) {
    //     output.write(e.message);
    // }
    rl.prompt();
}).on('close', () => {
    process.exit();
});
