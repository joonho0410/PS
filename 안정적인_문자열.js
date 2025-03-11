const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let num = 1;

while (1) {
    const str = input.shift().split('')
    if (str.includes('-')) break;

    let cnt = 0;
    let s = []
    for (char of str) {
        if (char === '{') {
            s.push('0');
            continue;
        }
        if (s.length != 0) s.pop();
        else if (s.length == 0) {
            ++cnt;
            s.push('0')
        }
    }
    cnt += s.length / 2
    console.log(num++ + '.', cnt)
}