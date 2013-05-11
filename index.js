module.exports = function (rows_, opts) {
    if (!opts) opts = {};
    var hsep = opts.hsep === undefined ? '  ' : opts.hsep;
    var align = opts.align || [];
    
    var dotsizes = rows_.reduce(function (acc, row) {
        row.forEach(function (c, ix) {
            var n = (String(c).split('.')[1] || '').length;
            if (!acc[ix] || n > acc[ix]) acc[ix] = n;
        });
        return acc;
    }, []);
    
    var rows = rows_.map(function (row) {
        return row.map(function (c, ix) {
            if (align[ix] === '.') {
                var size = dotsizes[ix] + (/\./.test(c) ? 1 : 2)
                    - (String(c).split('.')[1] || '').length
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
        }).join(hsep).trim();
    }).join('\n');
};
