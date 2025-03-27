const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)

const all = []
const selected = []
let ans = Infinity

comb(0);
all.sort((a, b) => a[2] - b[2])
solve();

function solve() {
    for (let i = 0; i < all.length; ++i) {
        const [i1, i2, val1] = all[i];

        let next = i + 1;
        while (next < all.length) {
            const [i3, i4, val2] = all[next++];
            if ([i1, i2].includes(i3) || [i1, i2].includes(i4)) continue;
            
            ans = Math.min(ans, Math.abs(val1 - val2))        
            break;
        }
    }
    console.log(ans);
}

function comb(idx) {
    if (selected.length === 2) {
        const e1 = selected[0]
        const e2 = selected[1]
        all.push([e1[0], e2[0], e1[1] + e2[1]]);
        return ;
    }
    for (let i = idx; i < N; ++i) {
        selected.push([i, ary[i]])
        comb(i + 1);
        selected.pop();
    }
}
