const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const isPrime = Array(10000).fill(true)

let T = Number(input.shift())

for (let i = 2; i < 10000; ++i) {
    if (isPrime[i]) {
        for (let j = i * 2; j < 10000; j += i)
            isPrime[j] = false;
    }
}

while (T--) {
    const [S, E] = input.shift().split(' ').map(Number)
    const ans = findAns(S, E)
    ans === -1 ? console.log("impossible") : console.log(ans)
}

function findAns(s, e) {
    const visit = Array(10000).fill(false)
    const q = [[s, 0]]
    let idx = 0;
    
    while (q.length > idx) {
        const [cur, cnt] = [String(q[idx][0]).split(''), q[idx][1]]
        ++idx;
        if (cur.join('') == e) return cnt;

        for (let i = 0; i < 4; ++i) {
            const curi = cur[i];
            for (let j = 0; j < 10; ++j) {
                if (curi == j) continue;
                cur[i] = j ;
                const curn = Number(cur.join(''))
                cur[i] = curi;
                if (curn < 1000) continue;
                if (!isPrime[curn]) continue;
                if (visit[curn]) continue;
                visit[curn] = true;
                q.push([curn, cnt + 1])
            }
        }
    }
    return -1
}