const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const train = input[1].split(' ').map(Number)
const N = Number(input[2])

const dp = Array.from({ length : 4 }, () => Array(train.length).fill(-Infinity))

let s = 0;
let e = 0;
let sum = 0;
while (1) {
    if (e >= train.length) break;
    while (e - s + 1 <= N) {
        if (e >= train.length) break;
        sum += train[e];
        ++e; 
    }
    dp[0][s] = sum;
    sum -= train[s];
    ++s;
}

for (let i = 0; i < train.length; ++i) {
    // update
    for (let k = 1; k < 4; ++k) {
        if (i - 1 < 0) break;
        dp[k][i] = Math.max(dp[k][i - 1], dp[k][i])
    }

    for (let k = 1; k < 4; ++k) {
        dp[k][i + N] = ( k === 1 ? dp[0][i] : dp[k - 1][i] + dp[0][i]) 
    }
}

console.log(Math.max(...dp[3]))