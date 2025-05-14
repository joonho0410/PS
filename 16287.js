const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [W, A] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)

solve();

function solve() {
    const cache = Array.from({length : 2}, () => Array(W + 1).fill(-1))
    
    let ans = 'NO'

    for (let i = 0; i < A; ++i) {
        for (let j = i + 1; j < A; ++j) {
            if (ary[i] + ary[j] > W) continue;
            cache[0][ary[i] + ary[j]] = i;
            cache[1][ary[i] + ary[j]] = j;
        }
    }

    for (let i = 0; i < A; ++i) {
        for (let j = i + 1; j < A; ++j) {
            const target = W - (ary[i] + ary[j])
            if (target < 0) continue;
            if (cache[0][target] === -1) continue;
            const [a, b] = [ cache[0][target], cache[1][target] ]
            if (a !== i && a !== j && b !== i && b !== j) ans = 'YES'
        }
    }
    console.log(ans)
}
