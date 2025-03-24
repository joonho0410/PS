const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dp = Array.from({length : 10}, () => Array(1024).fill(Infinity))


const [N, K] = input.shift().split(' ').map(Number)
const dist = []

for (let i = 0; i < N; ++i) {
    dist.push(input[i].split(' ').map(Number))
}

dp[0][1 << K] = 0;

for (let m = 0; m < N; ++m) {
    for (let s = 0; s < N; ++s) {
        for (let e = 0; e < N; ++e) {
            if (dist[s][m] + dist[m][e] < dist[s][e]) dist[s][e] = dist[s][m] + dist[m][e];
        }
    }
}

solve();

function solve() {
    const q = [[K, 1 << K, 0]] // [위치, 방문한 곳, 걸린시간]
    let idx = 0;

    while (q.length > idx) {
        const [here, visited, cost] = q[idx++];
        
        if (dp[here][visited] !== Infinity && dp[here][visited] > cost) continue;

        for (let next = 0; next < N; ++next) {
            // 이미 방문 했다면 방문하지 않는다.
            if ((1 << next & visited) > 0) continue;
            
            // 해당 위치를 방문하지않았다면, 그 위치로 이동하는 값보다 작다면 갱신하고 이동한다.
            let nextVisited = visited | (1 << next)
            if (cost + dist[here][next] < dp[next][nextVisited]) {
                dp[next][nextVisited] = cost + dist[here][next];
                q.push([next, nextVisited, dp[next][nextVisited]])
            }
        }
    }

    let answer = Infinity
    const target = Math.pow(2, N) - 1

    for (let i = 0; i < N; ++i) {
        answer = Math.min(answer, dp[i][target])
    }
    console.log(answer)
}
