const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const K = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const level = Array.from({length: 10}, () => [])

dq(ary, 0);
for (let i = 0; i < K; ++i) {
    console.log(level[i].join(' '))
}

function dq(ary, lv) {
    const len = ary.length; 
    const mid = Math.floor(ary.length / 2);
    level[lv].push(ary[mid]);
    if (ary.length === 1) return ;
    const left = ary.slice(0, mid);
    const right = ary.slice(mid + 1);
    dq(left, lv + 1)
    dq(right, lv + 1)
}
