const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(BigInt)
const arys = []
for (let i = 0; i < N; ++i) {
    arys.push(Number(input[i]))
}

console.log(String(bisect()));

function bisect() {
    let s = 0n;
    let e = BigInt(Math.min(...arys)) * M;

    while (s <= e) {
        let mid = (s + e) / 2n;
        let total = 0n;
        
        for (ary of arys) {
            total += mid / BigInt(ary); 
        }

        if (total >= M) e = mid - 1n;
        else s = mid + 1n;
    }

    return s;
}