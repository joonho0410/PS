const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const str = input.shift().split('')
const newStr = []

for (const char of str) {
    newStr.push('#')
    newStr.push(char)
}
newStr.push('#')

const mana = Array(newStr.length).fill(0)
let r = -1;
let c = -1;

for (let i = 0; i < mana.length; ++i) {
    if (r < i) mana[i] = 0;
    else mana[i] = Math.min(mana[2 * c - i], r - i)

    while (1) {
        if (i - mana[i] - 1 < 0 || i + mana[i] + 1 >= newStr.length) break;
        if (newStr[i - mana[i] - 1] !== newStr[i + mana[i] + 1]) break;
        ++mana[i]
    }
    
    if (r < i + mana[i]) {
        r = i + mana[i]
        c = i;
    }
}

let ans = 0;
for (let i = 0; i < newStr.length; ++i) {
    if (mana[i] % 2 === 1) ans += Math.floor(mana[i] / 2) + 1
    else ans += Math.floor(mana[i] / 2)
}

console.log(ans)
