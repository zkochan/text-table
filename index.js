module.exports = function (rows_, opts) {
    if (!opts) opts = {};
    var hsep = opts.hsep === undefined ? '  ' : opts.hsep;
    var align = opts.align || [];
    
    var dotsizes = rows_.reduce(function (acc, row) {
        row.forEach(function (c, ix) {
            var n = dotindex(c);
            if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
    }, []);
    
    var rows = rows_.map(function (row) {
        return row.map(function (c_, ix) {
            var c = String(c_);
            if (align[ix] === '.') {
                var index = dotindex(c);
                var size = dotsizes[ix] + (/\./.test(c) ? 1 : 2)
                    - (c.length - index)
                ;
                return c + Array(size).join(' ');
            }
            else return c;
        });
    });
    
    var sizes = rows.reduce(function (acc, row) {
        row.forEach(function (c, ix) {
            var n = String(c).length;
            if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
    }, []);
    
    return rows.map(function (row) {
        return row.map(function (c, ix) {
            var n = (sizes[ix] - String(c).length) || 0;
            var s = Array(Math.max(n + 1, 1)).join(' ');
            if (align[ix] === 'r' || align[ix] === '.') {
                return s + c;
            }
            if (align[ix] === 'c') {
                return Array(Math.ceil(n / 2 + 1)).join(' ')
                    + c + Array(Math.floor(n / 2 + 1)).join(' ')
                ;
            }
            
            return c + s;
        }).join(hsep).replace(/\s+$/, '');
    }).join('\n');
};

function dotindex (c) {
    var m = /\.[^.]*$/.exec(c);
    return m ? m.index + 1 : c.length;
}
