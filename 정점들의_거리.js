const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const adj = Array.from({length : N + 1}, () => [])
const query = []

for (let i = 0; i < N - 1; ++i) {
    const [a, b, dis] = input[i].split(' ').map(Number)
    adj[a].push([b, dis])
    adj[b].push([a, dis])
}
input.splice(0, N - 1)
const M = Number(input.shift())
for (let i = 0; i < M; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    query.push([a, b])    
}

solve();

function solve() {
    const {distance, level, parent} = findDistanceFromRoot();
    for (const [a, b] of query) {
        const ancestor = findAncestor(a, b, parent, level)
        const ans = distance[a] + distance[b] - (2 * distance[ancestor])
        console.log(ans)
    }
}

function findAncestor(a, b, p, lv) {
    while (lv[a] !== lv[b]) {
        lv[a] > lv[b] ? a = p[a] : b = p[b]
    }
    while (a !== b) {
        a = p[a];
        b = p[b];
    }
    return a;
}
function findDistanceFromRoot() {
    const distance = Array(N + 1).fill(null)
    const parent = Array(N + 1).fill(0)
    const level = Array(N + 1).fill(0)
    const visit = Array(N + 1).fill(false)
    
    // init
    distance[1] = 0;
    level[1] = 0;
    parent[1] = 1;

    // dfs
    const stack = [1]
    while (stack.length !== 0) {
        const node = stack.pop();
        visit[node] = true;

        for (const [next, nextDis] of adj[node]) {
            if (visit[next]) continue;
            stack.push(next);
            distance[next] = distance[node] + nextDis;
            level[next] = level[node] + 1;
            parent[next] = node;
        }
    }

    return {distance, level, parent}
}
