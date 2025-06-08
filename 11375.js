const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)

const work = Array(M + 1).fill(null)
const adj = Array.from({length : (N + 1) }, () => [])


for (let i = 0; i < N; ++i) {
    adj[i + 1] = input[i].split(' ').map(Number).slice(1) 
}

let ans = 0;

for (let i = 1; i <= N; ++i) {
    const visited = Array(N + 1).fill(false)
    if (dfs(i)) ++ans;
    
    function dfs(node) {
        for (const next of adj[node]) {
            if (visited[next]) continue;
            visited[next] = true;

            if (work[next] === null || dfs(work[next])) {
                work[next] = node;
                return true;
            }
        }
        return false;
    }
}

console.log(ans)
