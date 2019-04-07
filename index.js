const readline = require('readline');
const Command = require('./components/Command');
const OperationType = require('./components/OperationType');
const Canvas = require('./components/Canvas');
const CanvasEditor = require('./components/CanvasEditor');
const Renderer = require('./components/Renderer');

const input = process.stdin;
const output = process.stdout;

const rl = readline.createInterface({
    input: input,
    output: output,
    prompt: 'enter command: '
});

let canvas;
let canvasEditor = new CanvasEditor();
const renderer = new Renderer(output);

run(rl, canvasEditor, renderer, exit);

function run(rl, canvasEditor, renderer, exit) {
    rl.prompt();
    rl.on('line', line => {
        try {
            const command = new Command(line);

            switch (command.getOperation()) {
                case OperationType.CREATE_CANVAS:
                    // console.log("Creating Canvas");
                    canvas = Canvas.create(command.getX1(), command.getY1());
                    renderer.render(canvas);
                    rl.prompt();
                    break;
                case OperationType.DRAW_LINE:
                    // console.log("Drawing Line");
                    canvasEditor.drawLine(
                        canvas,
                        command.getX1(), command.getY1(),
                        command.getX2(), command.getY2(),
                    );
                    renderer.render(canvas);
                    rl.prompt();
                    break;
                case OperationType.DRAW_RECT:
                    // console.log("Drawing Rectangle");
                    canvasEditor.drawRectangle(
                        canvas,
                        command.getX1(), command.getY1(),
                        command.getX2(), command.getY2(),
                    );
                    renderer.render(canvas);
                    rl.prompt();
                    break;
                case OperationType.BUCKET_FILL:
                    // console.log("Drawing Bucket Fill");
                    canvasEditor.bucketFill(
                        canvas,
                        command.getX1(),
                        command.getY1(),
                        command.getFillValue()
                    );
                    renderer.render(canvas);
                    rl.prompt();
                    break;
                case OperationType.QUIT:
                    rl.close();
                    break;
            }
        } catch (e) {
            output.write(e.message);
            rl.prompt();
        }
    }).on('close', exit)
}

// function handleLine(line, canvas, renderer, canvasEditor) {
//     const command = new Command(line);
//
//     switch (command.getOperation()) {
//         case OperationType.CREATE_CANVAS:
//             // console.log("Creating Canvas");
//             canvas = Canvas.create(command.getX1(), command.getY1());
//             renderer.render(canvas);
//             break;
//         case OperationType.DRAW_LINE:
//             // console.log("Drawing Line");
//             canvasEditor.drawLine(
//                 canvas,
//                 command.getX1(), command.getY1(),
//                 command.getX2(), command.getY2(),
//             );
//             renderer.render(canvas);
//             break;
//         case OperationType.DRAW_RECT:
//             // console.log("Drawing Rectangle");
//             canvasEditor.drawRectangle(
//                 canvas,
//                 command.getX1(), command.getY1(),
//                 command.getX2(), command.getY2(),
//             );
//             renderer.render(canvas);
//             break;
//         case OperationType.BUCKET_FILL:
//             // console.log("Drawing Bucket Fill");
//             canvasEditor.bucketFill(
//                 canvas,
//                 command.getX1(),
//                 command.getY1(),
//                 command.getFillValue()
//             );
//             renderer.render(canvas);
//             break;
//         case OperationType.QUIT:
//             rl.close();
//             break;
//     }
//
//     return canvas;
// }

function exit() {
    process.exitCode = 0;
}

module.exports = {
    // handleLine,
    run,
    exit
};
