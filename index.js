module.exports = function (rows, opts) {
    if (!opts) opts = {};
    var hsep = opts.hsep === undefined ? ' ' : opts.hsep;
    var align = opts.align || [];
    
    var sizes = rows.reduce(function (acc, row) {
        row.forEach(function (c, ix) {
            var n = String(c).length;
            if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
    }, []);
    return rows.map(function (row) {
        return row.map(function (c, ix) {
            var s = Array(sizes[ix] - c.length + 1).join(' ');
            if (align[ix] === 'r') {
                return s + c;
            }
            if (align[ix] === 'r.') {
            }
            if (align[ix] === 'c') {
            }
            
            return c + s;
        }).join(hsep).trim();
    }).join('\n');
};
