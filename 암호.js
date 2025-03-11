const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const key = input.shift().split('')
const target = input.shift().split('')
const dp = Array(1000000).fill(0)
const mod = 900528

dp[0] = 1;
dp[1] = key.length;

for (let i = 2; i <= 1000000; ++i) {
    dp[i] = (dp[i - 1] * key.length) % mod
}

let ans = 1;

for (let i = 1; i < target.length; ++i) {
    ans = (ans + dp[i]) % mod;
}

for (let i = 0; i < target.length; ++i) {
    let idx = 0;

    for (let j = 0; j < key.length; ++j) {
        if (key[j] !== target[i]) continue;
        idx = j;
        break;
    }
    
    ans = (ans + (idx * dp[target.length - i - 1])) % mod 
}

console.log(ans)