const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const adj = Array.from({length : N + 1}, () => [])
const visit = Array(N + 1).fill(false)
const leafs = []

for (let i = 0; i < N - 1; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    adj[a].push(b)
    adj[b].push(a)
}

dfs();
findAns();

function dfs() {
    const q = [[1, 0]]
    visit[1] = true;

    while (q.length > 0) {
        const [node, lv] = q.pop()
        let isLeaf = true;

        for (next of adj[node]) {
            if (visit[next]) continue;
            isLeaf = false;
            visit[next] = true;
            q.push([next, lv + 1]);
        }

        if (isLeaf) leafs.push(lv);
    }
}

function findAns() {
    let sum = 0;

    for (leaf of leafs) {
        sum += leaf;
    }
    if (sum % 2 == 1) console.log('Yes')
    else console.log('No')
}