const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const dolls = input.shift().split(' ').map(Number)
const psum = Array(N + 1).fill(0);
let ans = Infinity

for (let i = 1; i <= N; ++i) {
    psum[i] = psum[i - 1] + dolls[i - 1];
}

for (let i = 0; i < N; ++i) {
    cal(i)
}

console.log(ans)

function cal(idx) {
    for (let len = K; len + idx <= N; ++len) {
        const mid = (psum[idx + len] - psum[idx]) / len;
        let sum = 0;
        for (let i = idx; i < idx + len; ++i) {
            const abs = Math.abs(dolls[i] - mid)
            sum += abs * abs;
        }
        const ret = Math.sqrt(sum / len)
        ans = Math.min(ret, ans)
    }
}
