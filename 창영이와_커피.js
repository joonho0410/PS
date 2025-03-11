const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)
ary.sort((a, b) => {return  b - a})
const dp = Array(K + 1).fill(Infinity)
dp[0] = 0;
// dp[현재 카페인값] = 만들기 위해 사용한 최소갯수

for (coffe of ary) {
    for (let i = K; i >= 0; --i) {
        if (i - coffe < 0) break;
        dp[i] = Math.min(dp[i], dp[i - coffe] + 1);
    }
}

console.log(dp[K] === Infinity ? -1 : dp[K])