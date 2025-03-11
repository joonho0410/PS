const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const dist = Array.from({length : N + 1}, () => Array(N + 1).fill(Infinity))
let idx = 0;

while (1) {
    const [a, b] = input[idx++].split(' ').map(Number)
    if (a === -1 && b === -1) break;
    dist[a][b] = 1;
    dist[b][a] = 1;
}



for (let m = 1; m <= N; ++m){
    for (let s = 1; s <= N; ++s){
        for (let e = 1; e <= N; ++e){
            if (dist[s][e] > dist[s][m] + dist[m][e])
                dist[s][e] = dist[s][m] + dist[m][e];
        }
    }
}
let min = Infinity
let ans = []

for (let i = 1; i <= N; ++i) {
    let max = -1;
    for (let j = 1; j <=N; ++j) {
        if (i == j) continue;
        max = Math.max(max, dist[i][j])
    }
    if (max === min) ans.push(i);
    if (max < min) {
        min = max;
        ans = [i]
    }
}
console.log(min, ans.length)
console.log(ans.join(' '))