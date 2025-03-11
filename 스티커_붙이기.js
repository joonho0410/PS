const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C, K] = input.shift().split(' ').map(Number)
const used = Array.from({length : R}, () => Array(C).fill(false))

for (let i = 0; i < K; ++i) {
    const [sr, sc] = input[0].split(' ').map(Number)
    let sticker = []
    let isBreak = false;
    for (let j = 0; j < sr; ++j) sticker.push(input[j + 1].split(' ').map(Number))

    for (let j = 0 ; j < 4; ++j) {
        for (let r = 0; r < R; ++r) {
            for (let c = 0; c < C; ++c) {
                if (putSticker(r, c, sticker)) {isBreak = true; break;}
            }
            if (isBreak) break;
        }
        if (isBreak) break;
        sticker = rotateSticker(sticker);
    }
    
    input.splice(0, 1 + sr);
}

let ans = 0;
for (let i = 0; i < R; ++i) 
    for (let j = 0; j < C; ++j) 
        if (used[i][j]) ++ans
console.log(ans)

function putSticker(r, c, sticker) {
    const [rlen, clen] = [sticker.length, sticker[0].length]
    
    for (let i = 0; i < rlen; ++i) {
        for (let j = 0; j < clen; ++j) {
            if (i + r >= R) return false;
            if (j + c >= C) return false;
            if (sticker[i][j] === 1 && used[i + r][j + c] === true) return false;
        }
    }

    for (let i = 0; i < rlen; ++i) {
        for (let j = 0; j < clen; ++j) {
            if (sticker[i][j] === 1) used[i + r][j + c] = true
        }
    }
    
    return true;
}

function rotateSticker(sticker) {
    const newSticker = Array.from({length : sticker[0].length}, ()=> Array(sticker.length).fill(0));
    const [rlen, clen] = [sticker.length, sticker[0].length]
    
    for (let curr = 0; curr < sticker.length; ++curr) {
        for (let curc = 0; curc < sticker[0].length; ++curc) {
            const nextc = rlen - curr - 1
            const nextr = curc
            newSticker[nextr][nextc] = sticker[curr][curc]
        }
    }

    return newSticker
}