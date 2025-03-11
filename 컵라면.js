const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const p = Array(N + 1).fill(0);

let work = []
for (let i = 0; i < N; ++i) {
    work.push(input[i].split(' ').map(Number))
}
work = work.sort((a, b) => {
    return b[1] - a[1];
})

for (let i = 0; i <= N; ++i){
    p[i] = i;
}

let ans = 0;
for (let i = 0; i < work.length; ++i){
    const [dead, val] = work[i];
    if (findP(dead) == 0) continue;
    const np = findP(dead)
    p[np] = findP(np - 1)
    ans += val;
}
console.log(ans)

function findP(n) {
    if (p[n] == n) return n;
    p[n] = findP(p[n])
    return p[n];
}