const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const names = []

for (let i = 0; i < N; ++i) {
    names.push(Number(input[i]))
}

const dp = Array(N + 1).fill(0)

for (let i = N - 2; i >= 0; --i) {
    let nameLen = names[i]
    let next = i + 1;

    dp[i] = Math.pow(M - nameLen, 2) + dp[next]

    while (next < N) {
        nameLen += (1 + names[next])
        if (nameLen > M) break;

        const cost = (next === N - 1) ? 0 : Math.pow(M - nameLen, 2) + dp[next + 1]
        dp[i] = Math.min(dp[i], cost)
        ++next;
    }
}

console.log(dp[0])
