const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const papers = input.shift().split(' ').map(Number)

console.log(bisect())

function bisect() {
    let s = 0;
    let e = 0;
    papers.forEach((p) => e += p)

    while (s <= e) {
        let mid = Math.floor((s + e) / 2)
        const cnt = sweep(mid);

        if (cnt >= K) s = mid + 1;
        else e = mid - 1;
    }

    return e;
}

function sweep(target) {
    let cnt = 0;
    let sum = 0;

    for (let i = 0; i < papers.length; ++i) {
        if (sum + papers[i] >= target) {
            ++cnt;
            sum = 0;
            continue;
        }
        sum += papers[i];
    }

    return cnt;
}
