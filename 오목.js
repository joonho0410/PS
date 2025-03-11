const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const map = input.map((e) => {
    return e.split(' ').map(Number)
})
const visitV = Array.from({length: 19}, () => Array(19).fill(false))
const visitH = Array.from({length: 19}, () => Array(19).fill(false))
const visitrd = Array.from({length: 19}, () => Array(19).fill(false))
const visitld = Array.from({length: 19}, () => Array(19).fill(false))
let winner = -1;
let ansr = 0;
let ansc = 0;

function checkV(r, c) {
    let cnt = 0;
    let color = map[r][c];
    visitV[r][c] = true;

    for (let nr = r; nr < 19; ++nr) {
        if (map[nr][c] != color) break;
        visitV[nr][c] = true;
        ++cnt;
    }
    if (cnt !== 5) return ;
    winner = color;
    ansr = r;
    ansc = c;
}

function checkH(r, c) {
    let cnt = 0;
    let color = map[r][c];
    visitH[r][c] = true;

    for (let nc = c; nc < 19; ++nc) {
        if (map[r][nc] != color) break;
        visitH[r][nc] = true;
        ++cnt;
    }
    if (cnt !== 5) return ;
    winner = color;
    ansr = r;
    ansc = c;    
}

function checkrd(r, c) {
    let cnt = 0;
    let color = map[r][c];
    visitrd[r][c] = true;
    let nr = r;
    let nc = c;
    while (nr < 19 && nc < 19) {
        if (map[nr][nc] != color) break;
        visitrd[nr][nc] = true;
        ++cnt;
        ++nr;
        ++nc;
    }
    
    if (cnt !== 5) return ;
    winner = color;
    ansr = r;
    ansc = c;
}

function checkld(r, c) {
    let cnt = 0;
    let color = map[r][c];
    visitld[r][c] = true;
    let nr = r;
    let nc = c;
    while (nr < 19 && nc >= 0) {
        if (map[nr][nc] != color) break;
        visitld[nr][nc] = true;
        ++cnt;
        ++nr;
        --nc;
    }
    
    if (cnt !== 5) return ;
    winner = color;
    ansr = r + 4;
    ansc = c - 4;
}

for (let i = 0; i < 19; ++i) {
    for (let j = 0; j < 19; ++j) {
        if (map[i][j] == 0) continue;
        if (!visitV[i][j]) checkV(i, j)
        if (!visitH[i][j]) checkH(i, j)
        if (!visitrd[i][j]) checkrd(i, j)
        if (!visitld[i][j]) checkld(i, j)
    }
}

if (winner === -1) {
    console.log(0)
    return ;
}
console.log(winner)
console.log(ansr + 1, ansc + 1);