const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const map = []
const pInfoMap = Array.from({length : N}, () =>
    Array.from({length : N}, () => []))
const dr = [0, 0, -1, 1]
const dc = [1, -1, 0, 0]
const pieces = []
const rdir = [1, 0, 3, 2]

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

input.splice(0, N)
for (let i = 0; i < K; ++i) {
    const [r, c, dir] = input[i].split(' ').map(Number)
    pInfoMap[r - 1][c - 1].push(i)
    pieces.push([r - 1, c - 1, dir - 1]) // [r, c, dir]
}
solve();

function solve() {
    let ans = 1;
    let isEnd = false;

    while (ans <= 1000) {
        for (let idx = 0; idx < pieces.length; ++idx) {
            const [r, c, dir] = pieces[idx]
            let nr = r + dr[dir]
            let nc = c + dc[dir]
            
            if (nr < 0 || nr >= N || nc < 0 || nc >= N || map[nr][nc] === 2) {
                const newDir = rdir[dir]
                pieces[idx][2] = newDir
                nr = r + dr[newDir]
                nc = c + dc[newDir]
            
                if (nr < 0 || nr >= N || nc < 0 || nc >= N || map[nr][nc] === 2) continue;
                if (movePiece(idx, r, c, nr, nc, map[nr][nc])) isEnd = true
                continue;
            }
            // 그 외의 경우
            if (movePiece(idx, r, c, nr, nc, map[nr][nc])) isEnd = true
        }
        if (isEnd) break;
        ++ans
    }

    if (!isEnd) ans = -1;
    console.log(ans)
}

// 기물번호, 현재위치, 다음위치, 색깔
function movePiece(pIdx, r, c, nr, nc, color) {
    const curLocation = pInfoMap[r][c]
    const nextLocation = pInfoMap[nr][nc]
    let loca = curLocation.indexOf(pIdx)

    const remain = curLocation.slice(0, loca)
    const move = curLocation.slice(loca)
    pInfoMap[r][c] = remain;

    if (color === 1) move.reverse();
    move.forEach((e) => {
        const [r, c, dir] = pieces[e]
        pieces[e] = [nr, nc, dir]
    })

    pInfoMap[nr][nc] = [...nextLocation, ...move]
    if (pInfoMap[nr][nc].length >= 4) return true;
        return false;
}
