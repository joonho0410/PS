const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const adj = Array.from({length : N + 1}, () => [])
const ants = [null]
for (let i = 0; i < N; ++i) {
    ants.push(Number(input[i]))
}

input.splice(0, N)

for (let i = 0; i < N - 1; ++i) {
    const [s, e, len] = input[i].split(' ').map(Number)
    adj[s].push([e, len])
    adj[e].push([s, len])
}

solve();

function solve() {
    const { parent, dist } = setTree();
    
    const ans = []
    for (let i = 1; i <= N; ++i) {
        ans.push(findHighest(parent, dist, i))
    }
    console.log(ans.join('\n'))
}

function findHighest(parent, dist, num) {
    let energy = ants[num];
    let cur = num;
    let cnt = 0;

    while (1) {
        const p = parent[cur][cnt]
        if (cnt === 0 && dist[cur] - dist[p] > energy) return cur;
        if (dist[cur] - dist[p] <= energy && p === 1) return 1;
        if (dist[cur] - dist[p] > energy) {
            let next = parent[cur][cnt - 1];
            energy -= dist[cur] - dist[next];
            cur = next;
            cnt = 0;
            continue;
        }
        ++cnt;
    }
    return cur;
}

function setTree() {
    const visit = Array(N + 1).fill(false)
    const parent = Array.from({length : N + 1}, () =>
        Array(20).fill(-1))
    const dist = Array(N + 1).fill(0);

    dfs(1, 1, 0)

    for (let i = 1; i < 20; ++i) {
        for (let n = 1; n <= N; ++n) {
            const mid = parent[n][i - 1]
            if (mid !== -1) parent[n][i] = parent[mid][i - 1]
        }
    }

    return { parent, dist }

    function dfs(node, ac, dis) {
        visit[node] = true;
        parent[node][0] = ac;
        dist[node] = dis;

        for (const [next, len] of adj[node]) {
            if (visit[next]) continue;
            dfs(next, node, dis + len)
        }
    }

}
