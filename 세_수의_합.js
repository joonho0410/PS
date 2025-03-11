const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

input.shift()
const ary = input.map(Number);
const minus = new Map()
const plus = new Set()

for (let i = 0; i < ary.length; ++i) {
    for (let j = i; j < ary.length; ++j) {
        plus.add(ary[i] + ary[j])
        minus.set(ary[j] - ary[i], ary[j])
    }
}

const temp = [...plus]
temp.sort((a, b) => b - a)
let ans = 0;

for (ele of temp) {
    if (!minus.has(ele)) continue;
    ans = Math.max(ans, minus.get(ele))
}

console.log(ans)