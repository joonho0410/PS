const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C] = input.shift().split(' ').map(Number)
const map = []
const isHori = Array.from({length : R}, () => Array(C).fill(false))
const isVerti = Array.from({length : R}, () => Array(C).fill(false))
let ans = 0;

for (let i = 0; i < R; ++i) {
    map.push(input[i].split(''))
}

recur (0)
console.log(ans)

function recur(idx) {
    if (idx === R * C) {
        ans = Math.max(findAns(), ans)
        return ;
    }

    const r = Math.floor(idx / C)
    const c = idx % C

    isHori[r][c] = true;
    recur(idx + 1)
    isHori[r][c] = false;
    isVerti[r][c] = true;
    recur(idx + 1)
    isVerti[r][c] = false;
    return ;
}

function findAns() {
    const visit = Array.from({length : R}, () => Array(C).fill(false))
    let sum = 0;

    for (let r = 0; r < R; ++r) {
        for (let c = 0; c < C; ++c) {
            if (visit[r][c]) continue;
            if (isHori[r][c]) sum += sumHori(r, c)
            if (isVerti[r][c]) sum += sumVerti(r, c)
        }
    }

    return sum;

    function sumHori(sr, sc) {
        let sum = '0'
        for (let c = sc; c < C; ++c) {
            if (!isHori[sr][c]) break;
            visit[sr][c] = true;
            sum += map[sr][c]
        } 
        
        return Number(sum)
    }

    function sumVerti(sr, sc) {
        let sum = '0'
        for (let r = sr; r < R; ++r) {
            if (!isVerti[r][sc]) break;
            visit[r][sc] = true;
            sum += map[r][sc]
        }
        return Number(sum)
    }
}