const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const [a, b = 0, c = 0] = ary;

const dp = Array.from({length : a + 1}, () =>
    Array.from({length: b + 1}, () => 
    Array(c + 1).fill(Infinity)
))

const q = [[a, b, c]];
dp[a][b][c] = 0;
const seq = []
let idx = 0;
const temp = [1, 3, 9];

while (q.length > idx) {
    const [ca, cb, cc] = q[idx++]
    recur(ca, cb, cc)
}

function recur(ca, cb, cc) {
    if (seq.length === 3) {
        let [ta, tb, tc] = [ca - seq[0], cb - seq[1], cc - seq[2]];
        if (ta < 0) ta = 0;
        if (tb < 0) tb = 0;
        if (tc < 0) tc = 0;
        if (dp[ta][tb][tc] !== Infinity) return ;
        dp[ta][tb][tc] = dp[ca][cb][cc] + 1;
        q.push([ta, tb, tc]);  
        return ;
    }
    for (let i = 0; i < 3; ++i) {
        const cur = temp[i]
        if (seq.includes(cur)) continue;
        seq.push(cur);
        recur(ca, cb, cc)
        seq.pop();
    }
}

console.log(dp[0][0][0])