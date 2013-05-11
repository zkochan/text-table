var table = require('../');
var t = table([
    [ 'beep', '1024' ],
    [ 'boop', '334.212' ],
    [ 'foo', '1006' ],
    [ 'bar', '45.6' ]
], { align: [ 'l', 'r' ] });
console.log(t);
