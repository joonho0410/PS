const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const p = Array(N).fill(0)
const star = []
let adj = []
for (let i = 0 ; i < N; ++i) {
    const [x, y] = input[i].split(' ').map((e) => e * 100)
    star.push([x, y])
}

for (let i = 0; i < N; ++i) {
    const [xa, ya] = star[i]
    for (let j = i + 1; j < N; ++j) {
        const [xb, yb] = star[j];
        const x = xa - xb
        const y = ya - yb
        adj.push([i, j, Math.sqrt(x * x + y * y)]);
    }
}

adj = adj.sort((a, b) => {return a[2] - b[2]})

for (let i = 0; i < N; ++i){
    p[i] = i;
}
console.log(adj)
console.log(solve())

function solve() {
    let ans = 0;
    for (let i = 0; i < adj.length; ++i) {
        const [a, b, cost] = adj[i];
        if (merge(a, b)) ans += cost;
    }
    return ans;
}

function findP(n) {
    if (p[n] == n) return n;
    p[n] = findP(p[n])
    return p[n];
}

function merge(a, b) {
    a = findP(a)
    b = findP(b)
    if (a == b) return false;
    p[a] = b;
    return true;
}