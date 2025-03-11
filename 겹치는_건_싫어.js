const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, K] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)
const map = new Map();

let len = 0;
let ans = 0;

let s = 0;
for (let e = 0; e < ary.length; ++e) {
    ans = Math.max(len, ans);
    const cur = ary[e];
    if (!map.has(cur)) {
        map.set(cur, 1);
        ++len;
        continue;
    }
    if (map.get(cur) < K) {
        map.set(cur, map.get(cur) + 1)
        ++len;
        continue;   
    }
    while (1) {
        const del = ary[s++];
        map.set(del, map.get(del) - 1)
        --len;
        if (del === cur) break;
    }
    map.set(cur, map.get(cur) + 1)
    ++len;
}
ans = Math.max(len, ans);
console.log(ans)