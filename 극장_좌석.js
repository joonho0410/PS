const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const M = Number(input.shift());
const mvp = input.map(Number);
const dp = Array.from({length : N + 1}, () => Array(3).fill(0));
const isMvp = Array(N + 2).fill(false)
// dp[N][before, cur, next];

isMvp[0] = true;
isMvp[N + 1] = true;

for (e of mvp) {
    isMvp[e] = true;
}

let ans = 1;

for (let i = 1; i <= N + 1; ++i) {
    if (isMvp[i]) {
        let sum = 0;
        for (let j = 0; j < 3; ++j)
            sum += dp[i - 1][j];
        const mult = sum === 0 ? 1 : sum;
        ans *= mult;
        continue;
    }
    if (isMvp[i - 1]) {
        dp[i][0] = 0;
        dp[i][1] = 1;
        dp[i][2] = 1;
        if (isMvp[i + 1]) dp[i][2] = 0;
        continue;
    }

    dp[i][1] = dp[i - 1][0] + dp[i - 1][1];

    if (isMvp[i + 1]) dp[i][2] = 0;
    else dp[i][2] = dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2];

    if (isMvp[i - 1]) dp[i][0] = 0;
    else {
        const t = i - 2 >= 0 ? dp[i - 2][1] + dp[i - 2][2] : 0 
        dp[i][0] = dp[i - 1][0] + dp[i - 1][2] - t
    }
}

console.log(ans);