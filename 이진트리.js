const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift());
const tree = [0].concat(input.shift().split(' ').map(Number))
const totalCnt = Math.pow(2, N + 1) - 1;
const sum = Array(totalCnt).fill(0);

const maxTarget = dfs(0, 0);
const dp = Array(totalCnt).fill(Infinity)

function dfs(idx, val) {
    sum[idx] = val + tree[idx];
    let l = 2 * idx + 1
    let r = 2 * idx + 2

    let left = 0;
    let right = 0;

    if (l < totalCnt) left = dfs(l, sum[idx]); 
    if (r < totalCnt) right = dfs(r, sum[idx]);

    return Math.max(left, right) + tree[idx]
}

let cnt = 0;
for (let i = totalCnt - 1; i > totalCnt - 1 - Math.pow(2, N); --i){
    const parent = Math.floor((i - 1) / 2)
    dp[i] = maxTarget - sum[i]
}

for (let i = totalCnt - 1; i > 0; --i) {
    const parent = Math.floor((i - 1) / 2);
    const lc = 2 * i + 1;
    const rc = 2 * i + 2;

    dp[parent] = Math.min(dp[parent], dp[i])
    if (lc <= totalCnt - 1) dp[lc] -= dp[i];
    if (rc <= totalCnt - 1) dp[rc] -= dp[i]
}

let ans = 0n;
tree.forEach((e) => ans += BigInt(e))
dp.forEach((e) => {
    if (e !== Infinity) ans += BigInt(e)
})
console.log(String(ans))
