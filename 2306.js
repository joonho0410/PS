const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const DNA = input.shift().split('')

const dp = Array.from({length : DNA.length}, () => Array(DNA.length).fill(0))

let ans = 0;
for (let len = 2; len <= DNA.length; ++len) {
    for (let s = 0; s < DNA.length; ++s) {
        let e = s + len - 1;
        if (e >= DNA.length) break;
        if ((DNA[s] === 'a' && DNA[e] === 't') || (DNA[s] === 'g' && DNA[e] === 'c') ) dp[s][e] = dp[s + 1][e - 1] + 2;
        for (let s2 = s; s2 < e; ++s2) {
            dp[s][e] = Math.max(dp[s][e], dp[s][s2] + dp[s2 + 1][e])
        }
        ans = Math.max(dp[s][e], ans)
    }
}

console.log(ans)
