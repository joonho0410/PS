const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, L] = input.shift().split(' ').map(Number)
const holes = []
for (let i = 0; i < N; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    holes.push([s, e])
}

holes.sort((a, b) => a[0] - b[0])

let last = 0; // 마지막 널빤지가 놓인 다음위치.
let ans = 0;

for (hole of holes) {
    const [s, e] = hole;
    
    if (e < last) continue;
    if (last <= s) {
        const usedCnt = Math.ceil((e - s) / L);
        ans += usedCnt;
        last = s + usedCnt * L;
        continue;
    }
    const usedCnt = Math.ceil((e - last) / L);
    ans += usedCnt;
    last += usedCnt * L
}

console.log(ans)
