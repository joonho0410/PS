const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')

const text = input.shift().split('')
const pattern = input.shift().split('')

solve();
function solve() {
    const pi = getPi();

    const ans = []
    let len = 0;
    for (let i = 0; i < text.length; ++i) {
        while (len > 0 && text[i] !== pattern[len]) len = pi[len - 1]
        if (text[i] === pattern[len]) {
            if (len === pattern.length - 1) {
                ans.push(i - pattern.length + 2)
                len = pi[len]
            } else {
                len ++;
            }
        }
    }
    console.log(ans.length)
    console.log(ans.join(' '))
}

function getPi() {
    const pi = Array(pattern.length).fill(0)
    let len = 0;
    for (let i = 1; i < pattern.length; ++i) {
        while (len > 0 && pattern[i] !== pattern[len]) len = pi[len - 1];
        if (pattern[i] === pattern[len]) pi[i] = ++len;
    }

    return pi
}
