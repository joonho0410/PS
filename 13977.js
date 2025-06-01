const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const M = Number(input.shift())
const MOD = 1000000007n;
const maxN = 4000000
const dp = Array(maxN + 1).fill(1n);

for (let i = 2; i <= maxN; ++i ) {
    dp[i] = (dp[i - 1] * BigInt(i)) % MOD
}

function xGCD(a, b) {
    if (b === 0n) return [a, 1n, 0n]

    const [gcd, x, y] = xGCD(b, a % b);
    return [gcd, y, x - a / b * y] 
}

solve();

function solve(){
    const ans = []

    for (let i = 0; i < M; ++i) {
        const [N, K] = input[i].split(' ').map(Number)
        if (K === 0) {ans.push(1); continue;}
        const top = dp[N]
        const r1 = (xGCD(dp[K], MOD)[1] + MOD) % MOD
        const r2 = (xGCD(dp[N - K], MOD)[1] + MOD) % MOD
        ans.push(String(top * r1 % MOD * r2 % MOD))
    }

    console.log(ans.join('\n'))
}
