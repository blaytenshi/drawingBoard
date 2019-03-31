process.stdout.write('enter command: \n');
process.stdin.on('data', function(data) {
    const input = data.toString().trim();
    switch(input) {
        case 'c':
            break;
        case 'q':
            process.exit();
            break;
        default:
            process.stdout.write('Invalid Command!');
    }
});
