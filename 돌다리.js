const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [A, B, N, M] = input.shift().split(' ').map(Number)

const MAX = 100001;
const dp = Array(MAX).fill(Infinity)
const q = [N]
dp[N] = 0;

let idx = 0;

while (q.length > idx) {
    const cur = q[idx++]
    if (cur === M) break;

    if (cur + 1 < MAX && dp[cur + 1] === Infinity ) {
        dp[cur + 1] = dp[cur] + 1;
        q.push(cur + 1)
    }
    if (cur - 1 >= 0 && dp[cur - 1] === Infinity) {
        dp[cur - 1] = dp[cur] + 1;
        q.push(cur - 1)
    }
    if (cur - A >= 0 && cur - A < MAX && dp[cur - A] === Infinity){
        dp[cur - A] = dp[cur] + 1;
        q.push(cur - A)
    }
    if (cur + A >= 0 && cur + A < MAX && dp[cur + A] === Infinity){
        dp[cur + A] = dp[cur] + 1;
        q.push(cur + A)
    }
    if (cur - B >= 0 && cur - B < MAX && dp[cur - B] === Infinity){
        dp[cur - B] = dp[cur] + 1;
        q.push(cur - B)
    }
    if (cur + B >= 0 && cur + B < MAX && dp[cur + B] === Infinity){
        dp[cur + B] = dp[cur] + 1;
        q.push(cur + B)
    }
    if (cur * A >= 0 && cur * A < MAX && dp[cur * A] === Infinity){
        dp[cur * A] = dp[cur] + 1;
        q.push(cur * A)
    }
    if (cur * B >= 0 && cur * B < MAX && dp[cur * B] === Infinity){
        dp[cur * B] = dp[cur] + 1;
        q.push(cur * B)
    }
}

console.log(dp[M])