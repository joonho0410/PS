const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const stu = input.map(e => e.split(' ').map(Number))
const ary = Array(N * N + 1).fill(0)
const map = Array.from({ length: N }, () => Array(N).fill(-1));
const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

for (st of stu) {
    const [s, a, b, c, d] = st
    ary[s] = [a, b, c, d]
    findSeat(s)
}

let ans = 0;
for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c){
        const curp = map[r][c];
        let like = 0;
        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
            if (ary[curp].includes(map[nr][nc])) ++like;
        }
        if (like == 0) ans += 0;
        if (like == 1) ans += 1;
        if (like == 2) ans += 10;
        if (like == 3) ans += 100;
        if (like == 4) ans += 1000;
    }
}
console.log(ans)

function findSeat(s) {
    const likeP = ary[s];
    let like = -1;
    let empty = -1;
    let [sr, sc] = [-1, -1];

    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < N; ++c) {
            if (map[r][c] != -1) continue;
            let cempty = 0;
            let clike = 0;

            for (let i = 0; i < 4; ++i) {
                const nr = r + dr[i]
                const nc = c + dc[i]
                if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
                if (map[nr][nc] === -1) { ++cempty; continue; }
                if (likeP.includes(map[nr][nc])) { ++clike; continue; }
            }
            if (like === -1 && empty === -1) {
                like = clike;
                empty = cempty;
                [sr, sc] = [r, c]
                continue;
            }
            if (like < clike) {
                like = clike;
                empty = cempty;
                [sr, sc] = [r, c];
                continue;
            }
            if (like === clike && empty < cempty) {
                empty = cempty;
                [sr, sc] = [r, c];
                continue;
            }
        }
    }
    map[sr][sc] = s;
}