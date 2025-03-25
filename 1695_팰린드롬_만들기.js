const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const rAry = [...ary].reverse();

const dp = Array((N + 1) * (N + 1)).fill(0)

for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
        if (ary[i] === rAry[j]) dp[serialize(i + 1, j + 1)] = dp[serialize(i, j)] + 1;
        else {
            dp[serialize(i + 1, j + 1)] = Math.max(dp[serialize(i, j + 1)], dp[serialize(i + 1, j)])
        }
    }
}

console.log(N - dp[serialize(N, N)])

function serialize(i, j) {
    return i * (N + 1) + j
}
