const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let T = Number(input.shift())

while (T --) {
    const N = Number(input.shift())
    const coins = input.shift().split(' ').map(Number);
    const target = Number(input.shift())
    const dp = Array(target + 1).fill(0);

    for (coin of coins) {
        dp[coin] += 1;
        for (let i = coin; i <= target; ++i) {
            dp[i] += dp[i - coin];
        }
    }
    console.log(dp[target])
}