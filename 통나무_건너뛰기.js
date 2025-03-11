const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let T = Number(input.shift())

while (T--) {
    const N = Number(input.shift())
    const ary = input.shift().split(' ').map(Number)
    const left = []
    const right = []
    let max = 0
    ary.sort((a, b) => a - b);
    
    for (let i = 0; i < ary.length; ++i) {
        if (i % 2 == 0) left.push(ary[i]);
        else right.push(ary[i]);
    }
    const wood = [...left, ...right.reverse()]
    const len = wood.length;
    for (let i = 0; i < wood.length; ++i) {
        max = Math.max(max, Math.abs(wood[(i + len - 1) % len] - wood[i]))
    }
    console.log(max);
}