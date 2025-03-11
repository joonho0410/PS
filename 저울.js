const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const M = Number(input.shift())
const dp = Array(N + 1).fill(N - 1)
const visit = Array(N + 1).fill(false)
const toHigh = Array.from({length : N + 1}, () => [])
const toLow = Array.from({length : N + 1}, () => [])
for (let i = 0; i < M; ++i) {
    const [h, l] = input[i].split(' ').map(Number)
    toHigh[l].push(h);
    toLow[h].push(l);
}

for (let i = 1; i <= N; ++i) {
    hbfs(i);
    lbfs(i);
}

dp.shift();
console.log(dp.join('\n'))

function hbfs(start) {
    const ary = [start]
    const visit = Array(N + 1).fill(false)
    visit[start] = true;
    
    let idx = 0;
    while (ary.length > idx) { 
        const cur = ary[idx++]
        
        for (next of toHigh[cur]) {
            if (visit[next]) continue;
            visit[next] = true;
            ary.push(next)
            --dp[start];
        }
    }
}

function lbfs(start) {
    const ary = [start]
    const visit = Array(N + 1).fill(false)
    visit[start] = true;
    
    let idx = 0;
    while (ary.length > idx) { 
        const cur = ary[idx++]
        
        for (next of toLow[cur]) {
            if (visit[next]) continue;
            visit[next] = true;
            ary.push(next)
            --dp[start];
        }
    }
}