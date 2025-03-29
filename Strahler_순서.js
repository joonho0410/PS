const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let T = Number(input.shift())
let idx = 0;

while (T--) {
    const [K, M, P] = input[idx].split(' ').map(Number)

    const strahler = Array.from({length : M + 1}, () => [])
    const adj = Array.from({length: M + 1}, () => [])
    const degree = Array(M + 1).fill(0)
    const q = []

    for (let i = 1; i <= P; ++i) {
        const [u, v] = input[idx + i].split(' ').map(Number)
        adj[u].push(v);
        ++degree[v];
    }

    for (let i = 1; i <= M; ++i) {
        if (degree[i] !== 0) continue;
        strahler[i].push(1);
        q.push(i);
    }

    let Qidx = 0;
    let ans = 1;

    while (q.length > Qidx) {
        const node = q[Qidx++]
        let max = Math.max(...strahler[node]);
        let level = strahler[node].filter(e => e === max).length >= 2 ? max + 1 : max;
        ans = Math.max(ans, level);

        for (next of adj[node]) {
            strahler[next].push(level);
            if (--degree[next] === 0) q.push(next);
        }
    }
    
    console.log(K, ans)
    idx += P + 1;
}
