const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, D, K, C] = input.shift().split(' ').map(Number)
const ary = input.map(Number)
const selected = new Map()

selected.set(C, 1);
let ans = 0;

for (let i = 0; i < K; ++i) {
    const cur = selected.get(ary[i])
    if (cur) { selected.set(ary[i], cur + 1); continue;}
    selected.set(ary[i], 1);
}

for (let i = 0; i <= N; ++i) {
    ans = Math.max(selected.size, ans)
    const del = ary[i];
    const push = ary[(i + K) % N]
    if (selected.get(del) === 1) selected.delete(del)
    else selected.set(del, selected.get(del) - 1)
    if (!selected.get(push)) selected.set(push, 1)
    else selected.set(push, selected.get(push) + 1)
}

console.log(ans)