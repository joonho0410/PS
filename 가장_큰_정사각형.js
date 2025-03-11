const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const map = input.map((e) => e.split('').map(Number))
const dp = Array.from({length : N + 1}, () => Array(M + 1).fill([0, 0]))

let ans = 0;
for (let r = 1; r <= N; ++r){
    for (let c = 1; c <= M; ++c) {
        if (map[r - 1][c - 1] == 0) continue;
        const maxc = dp[r][c - 1][1];
        const maxr = dp[r - 1][c][0];
        const [dr, dc] = dp[r - 1][c - 1];
        const curc = Math.min(maxc, dc);
        const curr = Math.min(maxr, dr);
        dp[r][c] = [curr + 1, curc + 1];
        const temp = Math.min(dp[r][c][0], dp[r][c][1]);
        ans = Math.max(temp, ans);
    }
}
console.log(ans * ans);