const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const peoples = []

for (let i = 0; i < N; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    if (s <= e) continue;
    peoples.push([s, e])
}

peoples.sort((a , b) => a[1] - b[1]);

let [lastS, lastE] = [0, 0]
let ans = 0n;

for (p of peoples) {
    const [s, e] = p;
    if (e <= lastS) {
        lastS = Math.max(s, lastS);
    }
    else {
        ans = ans + BigInt(lastS - lastE);
        [lastS, lastE] = [s, e];
    }
}

ans = ans + BigInt(lastS - lastE)
ans = ans * 2n

console.log(String(ans + BigInt(M)))
