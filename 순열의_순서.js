const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = BigInt(input.shift())
const ary = input.shift().split(' ').map(BigInt)
const question = ary.shift();

let set = []
const dp = Array(20).fill(1n)
let temp = 1n; 
for (let i = 1n; i < 20n; ++i) {
    temp *= i;
    dp[i] = temp;
}

for (let i = 1n; i <= N; ++i) set.push(i)


if (question === 1n) {
    const ans = []
    let target = ary[0] - 1n
    
    while (set.length > 0) {
        const div = dp[set.length - 1]
        const ret = Number(target / div);
        target = target % div;
        ans.push(set[ret]);
        set = set.filter((value) => value !== set[ret])
    }
    console.log(ans.join(' '))
}
if (question === 2n) {
    let ans = 1n;
    for (let i = 0; i < ary.length; ++i) {
        const cur = ary[i];
        let idx = 0;
        for (s of set) {
            if (s === cur) break;
            ++idx;
        }
        ans += BigInt(idx) * dp[set.length - 1];
        set = set.filter((value) => value !== cur)
    }
    console.log(String(ans))
}