const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [A, B] = input.shift().split(' ').map(BigInt)
const ary = []
ary.push([A, 1]);

let idx = 0;
let ans = -1;

while (ary.length > idx) {
    const [cur, cnt] = ary[idx++]

    const a1 = BigInt(String(cur) + '1')
    const a2 = cur * 2n;
    
    if (a1 === B || a2 === B) {ans = cnt + 1; break;}
    if (a1 < B) ary.push([a1, cnt + 1])
    if (a2 < B) ary.push([a2, cnt + 1])
}

console.log(ans)