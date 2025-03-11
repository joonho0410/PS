const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C, K] = input.shift().split(' ').map(Number)
const map = Array.from({length: 100}, () => Array(100).fill(0))

for (let i = 0; i < 3; ++i) {
    const s = input.shift().split(' ').map(Number)
    for (let j = 0; j < 3; ++j){
        map[i][j] = s[j]
    }
}

let cr = 2;
let cc = 2;
let cnt = 0;
const tr = R - 1;
const tc = C - 1;

while (cnt <= 100) {
    if (check()) break;
    if (cc <= cr) sortR()
    else sortC()
    ++cnt;
}

cnt > 100 ? console.log(-1) : console.log(cnt)

function check() {
    if (tr > cr || tc > cc) return false;
    if (map[tr][tc] === K) return true;
    return false;
}

function draw(ary, dir, len) {
    // R
    if (dir == 0) {
        for (let i = 0; i < ary.length; ++i) {
            for (let j = 0; j < len; ++j) {
                if (j < ary[i].length) map[i][j] = ary[i][j]
                else map[i][j] = 0;
            }
        }
        cc = len - 1;
    }
    // C
    if (dir == 1) {
        for (let i = 0; i < ary.length; ++i) {
            for (let j = 0; j < len; ++j) {
                if (j < ary[i].length) map[j][i] = ary[i][j]
                else map[j][i] = 0;
            }
        }
        cr = len - 1;
    }
}

function sortR() {
    const ary = []
    let maxc = 0;

    for (let r = 0; r <= cr; ++r) {
        const m = new Map()
        for (let c = 0; c <= cc; ++c) {
            const cur = map[r][c]
            if (cur == 0) continue;
            if (m.has(cur)) m.set(cur, m.get(cur) + 1)
            else m.set(cur, 1);
        }
        let temp = []
        let temp2 = []
        m.forEach((value, key) => {
            temp.push([key, value])
        })
        temp = temp.sort((a, b) => {
            if (a[1] != b[1]) return a[1] - b[1];
            return a[0] - b[0];
        })
        temp.forEach((e) => {
            temp2.push(e[0])
            temp2.push(e[1])
        })
        ary.push(temp2);
        maxc = Math.max(maxc, temp2.length)
    }
    draw(ary, 0, maxc >= 100 ? 100 : maxc);
}

function sortC() {
    const ary = []
    let maxr = 0;

    for (let c = 0; c <= cc; ++c) {
        const m = new Map()
        for (let r = 0; r <= cr; ++r) {
            const cur = map[r][c]
            if (cur == 0) continue;
            if (m.has(cur)) m.set(cur, m.get(cur) + 1)
            else m.set(cur, 1);
        }
        let temp = []
        let temp2 = []
        m.forEach((value, key) => {
            temp.push([key, value])
        })
        temp = temp.sort((a, b) => {
            if (a[1] != b[1]) return a[1] - b[1];
            return a[0] - b[0];
        })
        temp.forEach((e) => {
            temp2.push(e[0])
            temp2.push(e[1])
        })
        ary.push(temp2);
        maxr = Math.max(maxr, temp2.length)
    }
    draw(ary, 1, maxr >= 100 ? 100 : maxr);
}