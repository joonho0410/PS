const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const K = Number(input.shift())
const ary = input.shift().split(' ').map(Number).sort((a, b) => a - b);

let dif = []
let sum = 0;
for (let i = 0; i < ary.length - 1; ++i) {
    sum += ary[i + 1] - ary[i]
    dif.push(ary[i + 1] - ary[i])
}
dif = dif.sort((a, b) => a - b);

let count = K;
while (--count) {
    if (dif.length == 0) break;
    sum -= dif.pop();
}

console.log(sum);