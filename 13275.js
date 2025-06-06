const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const s = input.shift().split('')
const str = ['#']

for (let i = 0; i < s.length; ++i) {
    str.push(s[i])
    str.push('#')
}

const dp = Array(str.length).fill(0)
let ans = 1;

// r = 팰린드롬의 끝, c = center
let r = -1;
let c = -1;

for (let i = 0; i < str.length; ++i) {
    if (r < i) dp[i] = 0;
    else dp[i] = Math.min(dp[2 * c - i], r - i)

    while (1) {
        if (i - dp[i] - 1 < 0 || i + dp[i] + 1 >= str.length) break;
        if (str[i - dp[i] - 1] !== str[i + dp[i] + 1]) break;
        ++dp[i]
    }

    if (r < i + dp[i]) {
        r = i + dp[i]
        c = i
    }
    ans = Math.max(ans, dp[i])
}

console.log(ans)
