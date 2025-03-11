const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const isUsed = Array(input.legnth).fill(false)
let ans = 0;

input.sort()

for (let i = 0; i < input.length; ++i) {
    if (isUsed[i]) continue;
    let dup = []
    for (let j = i + 1; j < input.length; ++j) 
        if (isPrefix(input[i], input[j])) dup.push(j)

    if (dup.length > 1) continue;
    if (dup.length == 1) isUsed[dup[0]] = true;
    ++ans;    
}

function isPrefix(a, b) {
    for (let i = 0; i < a.length; ++i) {
        if (a[i] != b[i]) return false;
    }
    return true;
}

console.log(ans)