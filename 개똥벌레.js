const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, H] = input.shift().split(' ').map(Number)
const dp = Array(H + 1).fill(0);
const obs = Array(H + 1).fill(0);

// even -> 석순 odd-> 종유석
for (let i = 0; i < N; ++i) {
    const n = Number(input[i])
    // even
    if (i % 2 == 0) {
        dp[1] += 1;
        dp[1 + n] -= 1;
        continue;
    }
    // odd
    dp[H - n + 1] += 1;
}

let sum = 0;
let min = Infinity;
let cnt = 0;

for (let i = 1; i <= H; ++i){
    sum += dp[i];
    obs[i] = sum;
    if (obs[i] < min) {
        min = obs[i];
        cnt = 1;
        continue;
    }
    if (obs[i] === min) {
        ++cnt;
        continue;
    }
}

console.log(min, cnt)