const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)

const dist = Array.from({length : N}, () =>
    Array(N).fill(Infinity)
)

const ans = Array.from({length : N}, () => 
    Array(N).fill('-')
)

for (let i = 0; i < N; ++i) dist[i][i] = 0
for (let i = 0; i < M; ++i) {
    const [a, b, t] = input[i].split(' ').map(Number)
    ans[a - 1][b - 1] = b - 1;
    ans[b - 1][a - 1] = a - 1;    
    dist[a - 1][b - 1] = t
    dist[b - 1][a - 1] = t
}

for (let m = 0; m < N; ++m){
    for (let s = 0; s < N; ++s){
        for (let e = 0; e < N; ++e) {
            if (dist[s][e] <= dist[s][m] + dist[m][e]) continue;
            dist[s][e] = dist[s][m] + dist[m][e]
            ans[s][e] = ans[s][m]
        }
    }
}

console.log(ans.map((e) => {
    const ary = e.map((ele) => { if (typeof ele === 'number') return ele + 1; else return ele}).join(' ')
    return ary
}).join('\n'))