const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [A, B, C] = input.shift().split(' ').map(Number)
const dp = Array.from({length: A + 1}, () => 
        Array.from({length: B + 1}, () => 
        Array(C + 1).fill(false)
    ))

dp[0][0][C] = true;
const max = [A, B, C];
const q = [[0, 0, C]]
const seq = [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]
let idx = 0;

while (q.length > idx) {
    const cur = q[idx++]

    for (let i = 0; i < 6; ++i) {
        let next = [...cur];
        const [x, y] = seq[i]; // x -> y
        const remain = max[y] - cur[y]

        if (cur[x] === 0) continue;
        if (cur[y] === max[y]) continue;
        if (cur[x] >= remain) {
            next[x] -= remain;
            next[y] = max[y];
        }
        if (cur[x] < remain) {
            next[x] = 0;
            next[y] = cur[y] + cur[x]
        }
        if (dp[next[0]][next[1]][next[2]]) continue;
        dp[next[0]][next[1]][next[2]] = true;
        q.push(next);
    }
}

const ans = new Set()

for (let i = 0; i <= B; ++i) {
    for (let j = 0; j <= C; ++j){
        if (dp[0][i][j]) ans.add(j)  
    }
}
console.log([...ans].sort((a, b) => a - b).join(' '))