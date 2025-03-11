const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())

const player = Array(9).fill(false)
const seq = Array(9).fill(0);
const res = []
player[0] = true;
seq[3] = 0;
let ans = -1;

for (let i = 0; i < N; ++i) {
    res.push(input[i].split(' ').map(Number))
}

recur(0)
console.log(ans)
function recur(cnt) {
    if (cnt === 9) {
        playgame()
        return;
    }
    if (cnt === 3) {
        recur(cnt + 1)
        return
    }

    for (let i = 0; i < 9; ++i) {
        if (player[i]) continue;
        player[i] = true;
        seq[cnt] = i;
        recur(cnt + 1)
        player[i] = false;
    }
}

function playgame() {
    let hitterCnt = 0;
    let outCnt = 0;
    let inning = 0;
    let resInning = res[0];
    let score = 0;
    let base1 = false;
    let base2 = false;
    let base3 = false;

    while (1) {
        let result = resInning[seq[hitterCnt]];
        
        if (result === 0) {
            if (++outCnt === 3) {
                outCnt = 0;
                if (++inning == N) break;
                base1= base2 = base3 = false;
                resInning = res[inning]
            }
            hitterCnt = (hitterCnt + 1) % 9
            continue;
        }
        switch (result) {
            case 1:
            score += base3;
            base3 = base2;
            base2 = base1;
            base1 = 1;
            break;
          case 2:
            score += base3 + base2;
            base3 = base1;
            base2 = 1;
            base1 = 0;
            break;
          case 3:
            score += base3 + base2 + base1;
            base1 = base2 = 0;
            base3 = 1;
            break;
          default:
            score += base3 + base2 + base1 + 1;
            base1 = base2 = base3 = 0;
        }
        hitterCnt = (hitterCnt + 1) % 9
    }
    ans = Math.max(ans, score)
}
