const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const copy = input.shift()
const code = ['9', ...copy.split('')];
const dp = Array(code.length + 1).fill(0);
// dp[n] = n자리까지의 해석가능한 갯수
// dp[n] = dp[n - 1] + dp[n - 2] (dp[n - 2] 는 해당 2개의 수가 26이하일 일 때)

let error = false;
dp[0] = 1;
for (let i = 1; i < code.length; ++i) {
    const cur = Number(code[i]);
    const before = Number(code[i - 1]);
    const t =  Number(code.slice(i - 1, i + 1).join(''));

    if (cur == 0) {
        if (before > 2 || before == 0) {
            error = true;
            break;
        }
        dp[i] += dp[i - 2];
        continue;
    }
    dp[i] += dp[i - 1]
    if (t <= 26 && t >= 10) dp[i] += dp[i - 2];
    dp[i] %= 1000000;
}

if (error) console.log(0)
else console.log(dp[code.length - 1])