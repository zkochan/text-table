'use strict'

module.exports = function (rows_, opts = {}) {
    const hsep = opts.hsep === undefined ? '  ' : opts.hsep
    const align = opts.align || []
    const stringLength = opts.stringLength
        || ((s) => String(s).length)
    
    const dotsizes = rows_.reduce(function (acc, row) {
        row.forEach(function (c, ix) {
            const n = dotindex(c)
            if (!acc[ix] || n > acc[ix]) acc[ix] = n
        })
        return acc
    }, [])
    
    const rows = rows_.map(function (row) {
        return row.map(function (c_, ix) {
            const c = String(c_);
            if (align[ix] === '.') {
                const index = dotindex(c)
                const size = dotsizes[ix] + (/\./.test(c) ? 0 : 1)
                    - (stringLength(c) - index)
                return `${c}${' '.repeat(size)}`
            }
            else return c
        });
    });
    
    const sizes = rows.reduce(function (acc, row) {
        row.forEach(function (c, ix) {
            const n = stringLength(c)
            if (!acc[ix] || n > acc[ix]) acc[ix] = n
        })
        return acc
    }, [])
    
    return rows.map(function (row) {
        return row.map(function (c, ix) {
            const n = (sizes[ix] - stringLength(c)) || 0;
            const s = ' '.repeat(n)
            if (align[ix] === 'r' || align[ix] === '.') {
                return `${s}${c}`
            }
            if (align[ix] === 'c') {
                return `${
                    ' '.repeat(Math.ceil(n / 2))
                }${c}${
                    ' '.repeat(Math.floor(n / 2))
                }`
            }
            
            return `${c}${s}`
        }).join(hsep).replace(/\s+$/, '')
    }).join('\n')
};

function dotindex (c) {
    const m = /\.[^.]*$/.exec(c)
    return m ? m.index + 1 : c.length
}
