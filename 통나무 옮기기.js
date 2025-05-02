const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

const N = Number(input.shift())
const map = []

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(''))
}

solve();

function solve() {
    const [sr, sc, sdir] = findMid('B'); // (r, c, hori(0) or vert(1))
    const [er, ec, edir] = findMid('E');

    const ret = bfs(sr, sc, sdir, er, ec, edir)
    console.log(ret === Infinity ? 0 : ret)
}

function bfs(sr, sc, sdir, er, ec, edir) {
    // visit[dir][r][c]
    let ans = Infinity
    const visit = Array.from({length : 2}, () => 
        Array.from({length : N}, () => 
            Array(N).fill(false)
        ))
    
    const q = [[sr, sc, sdir, 0]]
    let idx = 0;

    while (q.length > idx) {
        const [r, c, dir, cnt] = q[idx++]
        if (r == er && c == ec && dir == edir) { ans = cnt; break; }

        // rotate
        let nDir = (dir + 1) % 2
        if (checkRotate(r, c, dir) && !visit[nDir][r][c]) {
            visit[nDir][r][c] = true;
            q.push([r, c, nDir, cnt + 1])
        }

        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
            if (map[nr][nc] === '1' || visit[dir][nr][nc] || !checkMove(nr, nc, dir)) continue;
            visit[dir][nr][nc] = true;
            q.push([nr, nc, dir, cnt + 1])
        }
    }

    return ans;
}

function checkRotate(r, c, dir) {
    const dr = [-1, -1, -1, 0, 0, 0, 1, 1, 1]
    const dc = [-1, 0, 1, -1, 0, 1, -1, 0, 1]

    for (let i = 0; i < 9; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) return false;
        if (map[nr][nc] === '1') return false;
    }

    return true;
}

function checkMove(r, c, dir) {
    const dx = [1, -1]

    if (dir === 0) {
        for (let i = 0; i < 2; ++i) {
            const nc = c + dx[i]
            if (nc < 0 || nc >= N) return false;
            if (map[r][nc] === '1') return false;
        }   
    }
    if (dir === 1) {
        for (let i = 0; i < 2; ++i) {
            const nr = r + dx[i]
            if (nr < 0 || nr >= N) return false;
            if (map[nr][c] === '1') return false;
        }
    }

    return true;
}

function findMid(char) {
    let [sr, sc, dir] = [0, 0, 0]

    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < N; ++c) {
            if (map[r][c] !== char) continue;
            
            let cnt = 0;
            for (let i = 0; i < 2; ++i) {
                const nr = r + dr[i]
                const nc = c + dc[i]
                if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
                if (map[nr][nc] !== char) continue;
                ++cnt;
            }
            if (cnt === 2) [sr, sc, dir] = [r, c, 0]
            cnt = 0;
            for (let i = 2; i < 4; ++i) {
                const nr = r + dr[i]
                const nc = c + dc[i]
                if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
                if (map[nr][nc] !== char) continue;
                ++cnt;
            }
            if (cnt == 2) [sr, sc, dir] = [r, c, 1]
        }
    }

    return [sr, sc, dir]
}

