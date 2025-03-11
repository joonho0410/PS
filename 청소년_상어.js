const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const dr = [-1, -1, 0, 1, 1, 1, 0, -1]
const dc = [0, -1, -1, -1, 0, 1, 1, 1]
const fish = Array.from({length: 17}, () => []); // [r, c, dir]
const map = Array.from({length : 4}, () => Array(4).fill(0))

for (let k = 0; k < 4; ++k) {
    const ary = input[k].split(' ').map(Number)
    for (let i = 0 ; i < 8; i += 2) {
        const [f, dir] = [ary[i], ary[i + 1]]
        map[k][i / 2] = f;
        fish[f] = [k, i / 2, dir - 1, true];
    }
}

// 초기시작
let answer = 0;
let eat = 0;
moveShark(0, 0, map, fish)
console.log(answer)

function moveShark(r, c, oriMap, oriFish) {
    const cpyMap = oriMap.map((e) => [...e]);
    const cpyFish = oriFish.map((e) => [...e]);
    const cureat = cpyMap[r][c];
    const curdir = cpyFish[cureat][2];
    cpyFish[cureat] = [-1, -1, -1, false];
    cpyMap[r][c] = 0;
    eat += cureat;

    moveFish(cpyMap, cpyFish)

    for (let i = 1; i < 4; ++i) {
        const nr = r + dr[curdir] * i;
        const nc = c + dc[curdir] * i;
        if (nr < 0 || nc < 0 || nr > 3 || nc > 3) continue;
        if (cpyMap[nr][nc] == -1) continue;
        cpyMap[r][c] = -1;
        moveShark(nr, nc, cpyMap, cpyFish);
        cpyMap[r][c] = 0;
    }
    answer = Math.max(answer, eat);
    eat -= cureat;
}

function moveFish(cpyMap, cpyFish) {
    for (let i = 1; i < cpyFish.length; ++i) {
        let [r, c, dir, isAlive] = cpyFish[i];
        if (!isAlive) continue; // 이미 죽은 물고기       
        for (let j = 0; j < 8; ++j) {
            const ndir = (j + dir) % 8
            const nr = r + dr[ndir];
            const nc = c + dc[ndir];
            if (nr < 0 || nr > 3 || nc < 0 || nc > 3) continue;
            if (cpyMap[nr][nc] == 0) continue;
            if (cpyMap[nr][nc] == -1) {
                cpyFish[i] = [nr, nc, ndir, true];
                cpyMap[nr][nc] = i;
                cpyMap[r][c] = -1;
                break;
            }
            let swap = cpyMap[nr][nc]
            cpyFish[i] = [nr, nc, ndir, true];
            cpyFish[swap] = [r, c, cpyFish[swap][2], true];
            cpyMap[r][c] = swap;
            cpyMap[nr][nc] = i;
            break;
        }
    }
}