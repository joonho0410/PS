const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const T = Number(input.shift())

for (let i = 0; i < T; ++i) {
    const str = input[i].split('')
    let lidx = 0;
    let ridx = str.length - 1;
    let chance = true;
    let isPalin = true;

    while (lidx <= ridx) {
        if (str[lidx] !== str[ridx]) {
            chance = false;
            isPalin = (noChance(str, lidx + 1, ridx) || noChance(str, lidx, ridx - 1))
            break;
        }
        ++lidx;
        --ridx;
    }

    if (isPalin && chance) console.log('0')
    if (isPalin && !chance) console.log('1')
    if (!isPalin) console.log('2')
}

function noChance(str, lidx, ridx) {
    while (lidx <= ridx) {
        if (str[lidx] !== str[ridx]) return false;
        ++lidx;
        --ridx;
    }
    return true;
}