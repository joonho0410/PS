const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const MOD = 1000000007n
const dp = Array(N + 1).fill(null)
makeDp();
solve();

function solve() {
    let a = dp[N]
    let b = dp[N - K]
    let c = dp[K]
    const rb = (xGCD(b, MOD)[1] + MOD) % MOD;
    const rc = (xGCD(c, MOD)[1] + MOD) % MOD;
    console.log(String((a * rb % MOD) * rc % MOD));
}

function makeDp() {
    dp[0] = 1n;
    dp[1] = 1n;
    for (let i = 2; i <= N; ++i) {
        dp[i] = (dp[i - 1] * BigInt(i)) % MOD;   
    }
}

function xGCD(a, b) {
    if (b === 0n) return [a, 1n, 0n]
    const [g, x, y] = xGCD(b, a % b);
    const p = a / b
    return [g, y, x - p * y]
}
