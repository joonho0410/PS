const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const map = []
const dp = Array.from({length : N + 1}, () => Array(M + 1).fill(0))
const psum = Array.from({length : N + 1}, () => Array(M + 1).fill(0))

for (let i = 0; i < N; ++i){
    map.push(input[i].split(' ').map(Number))
}

for (let r = 1; r <= N; ++r) {
    for (let c = 1; c <= M; ++c) {
        psum[r][c] = psum[r][c - 1] + map[r - 1][c - 1];
    }
}
for (let c = 1; c <= M; ++c){
    dp[1][c] = psum[1][c];
}

for (let r = 2; r <= N; ++r) {
    findDp(r)
}

function findDp(r) {
    const left = Array(M + 2).fill(-Infinity);
    const right = Array(M + 2).fill(-Infinity);
    for (let c = 1; c <= M; ++c) {
        left[c] = Math.max(dp[r - 1][c], left[c - 1]) + map[r - 1][c - 1];
    }
    for (let c = M; c > 0; --c) {
        right[c] = Math.max(dp[r - 1][c], right[c + 1]) + map[r - 1][c - 1];
    }
    for (let c = 1; c <= M; ++c) {
        dp[r][c] = Math.max(left[c], right[c])
    }
}
console.log(dp[N][M])