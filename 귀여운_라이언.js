const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)

let ans = Infinity
let lions = 0;
let len = 0;

let s = 0;

for (let e = 0; e < ary.length; ++e) {
    const cur = ary[e];
    if (cur === 2) { ++len; continue } 
    ++len;
    ++lions;
    while (lions >= K) {
        if (lions === K) ans = Math.min(ans, len)
        if (ary[s++] === 1) --lions;
        --len
    }
}

ans === Infinity ? console.log(-1) : console.log(ans)