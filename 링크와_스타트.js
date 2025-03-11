const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const player = Array(N).fill(0);

const map = []
let ans = Infinity;

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

bt(0, 0);
console.log(ans)

function bt(idx, playerCnt) {
    if (playerCnt === Math.floor(N / 2)) {
        findScore();
        return ;
    }

    findScore();
    for (let i = idx; i < N; ++i) {
        player[i] = 1;
        bt(i + 1, playerCnt + 1);
        player[i] = 0;
    }
}

function findScore() {
    let team0 = 0;
    let team1 = 0;

    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < N; ++c) {
            if (player[r] !== player[c]) continue;
            if (player[r] == 1) team1 += map[r][c];
            else team0 += map[r][c];
        }
    }
    ans = Math.min(Math.abs(team0 - team1), ans);
}