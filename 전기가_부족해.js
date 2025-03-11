const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M, K] = input.shift().split(' ').map(Number)
const plants = input.shift().split(' ').map(Number)
const parent = Array(N + 1).fill(0)

for (let i = 0 ; i <= N; ++i) parent[i] = i;
for (plant of plants) {
    parent[plant] = 0;
}

const edges = input.map((e) => e.split(' ').map(Number))
edges.sort((a, b) => a[2] - b[2]);

solve();

function solve() {
    let ans = 0;
    for (edge of edges) {
        const [u, v, w] = edge;
        if (merge(u, v)) ans += w;
    }
    console.log(ans)
}

function findP(a) {
    if (parent[a] === a || parent[a] === 0) return parent[a];
    parent[a] = findP(parent[a]);
    return parent[a];
}

function merge(a, b) {
    a = findP(a);
    b = findP(b);

    if (a === b) return false;
    if (a < b) parent[b] = a;
    else parent[a] = b;

    return true;
}
