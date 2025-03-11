const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let [N, M, K] = input.shift().split(' ').map(BigInt)
const dp = Array.from({length: 201}, () => Array(201).fill(0n))

for (let i = 1; i <= 200; ++i){
    dp[i][0] = 1n;
    dp[i][i] = 1n;
    for (let j = 1; j < i; ++j) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
}

if (K > dp[N + M][M]) {
    console.log(-1)
    return ;
}

let ans = []
while (N != 0 && M != 0 && K != 0) {
    if (dp[N + M - 1n][M] >= K) {
        ans.push('a');
        N -= 1n;
        continue;
    }
    ans.push('z');
    K -= dp[N + M - 1n][M]
    M -= 1n;
}
while (N != 0) {
    ans.push('a')
    --N
}
while (M != 0) {
    ans.push('z')
    --M
}
console.log(ans.join(''))