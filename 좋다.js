const fs = require('fs')

const input = fs.readFileSync(0).toString().trim().split("\n")
const N = Number(input.shift())
const line = input.shift().split(" ").map(Number)
line.sort((a, b) => a - b)

function lowerbound (val) {
    let s = 0;
    let e = line.length - 1
    while (s <= e) {
        let mid = Math.floor((s + e) / 2)
        if (line[mid] >= val)
            e = mid - 1
        if (line[mid] < val)
            s = mid + 1
    }
    return s
}

function bisect(target, idx) {
    const search = line[target] - line[idx];
    let searched = lowerbound(search);
    
    if (searched === idx || searched === target) ++searched;
    if (searched === idx || searched === target) ++searched;
    if (searched >= line.length || line[searched] !== search) return false;
    return true;
}

function solve() {
    let ans = 0;
    for (let i = 0; i < line.length; ++i) {
        for (let j = 0; j < line.length; ++j) {
            if (i === j) continue;
            if (!bisect(i, j)) continue;
            ++ans;
            break;
        }
    }
    console.log(ans)
}

solve()