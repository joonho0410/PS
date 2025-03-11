const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const p = Array(N + 1).fill(0)
let ans = 0;

for (let i = 1; i <= N; ++i) p[i] = i;

for (let i = 0; i < M; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    if (merge(s, e)) continue;
    ++ans;
}

for (let i = 1; i <= N; ++i) {
    if (merge(1, i)) ++ans;
}

console.log(ans)

function findP(n) {
    if (p[n] === n) return n
    p[n] = findP(p[n])
    return p[n];
}

function merge(a, b) {
    a = findP(a);
    b = findP(b);
    if (a === b) return false;
    [a, b] = a < b ? [a , b] : [b , a]
    p[b] = a;
    return true;
}
