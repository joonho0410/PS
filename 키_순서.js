const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const adj = Array.from({length: N + 1}, () => [])
const radj = Array.from({length: N + 1}, () => [])

for (let i = 0; i < input.length; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    adj[s].push(e);
    radj[e].push(s);
}

let ans = 0;
for (let i = 1; i <= N; ++i) {
    if (bfs(i, adj) + bfs(i, radj) == N - 1) ++ans    
}
console.log(ans)

function bfs(n, adj) {
    const visit = Array(N + 1).fill(false);
    let cnt = 0;
    let q = [n];
    let idx = 0;
    visit[n] = true;

    while (q.length > idx) {
        const cur = q[idx++];

        for (next of adj[cur]) {
            if (visit[next]) continue;
            visit[next] = true;
            ++cnt;
            q.push(next);
        }
    }
    return cnt;
}
