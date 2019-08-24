var test = require('tape');
var table = require('../');
var chalk = require('chalk');
var stripAnsi = require('strip-ansi');

test('center', function (t) {
    t.plan(1);
    var opts = {
        align: [ 'l', 'c', 'l' ],
        stringLength: function(s) { return stripAnsi(s).length }
    };
    var s = table([
        [
            chalk.red('Red'), chalk.green('Green'), chalk.blue('Blue')
        ],
        [
            chalk.bold('Bold'), chalk.underline('Underline'),
            chalk.italic('Italic')
        ],
        [
            chalk.inverse('Inverse'), chalk.strikethrough('Strike'),
            'Blink'
        ],
        [ 'bar', '45', 'lmno' ]
    ], opts);
    t.equal(stripAnsi(s), [
        'Red        Green    Blue',
        'Bold     Underline  Italic',
        'Inverse    Strike   Blink',
        'bar          45     lmno'
    ].join('\n'));
});
