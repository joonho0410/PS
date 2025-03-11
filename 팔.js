const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [s, e] = input.shift().split(' ')

if (s.length != e.length) {
    console.log(0);
    return ;
}

const ss = s.split('')
const se = e.split('')

let eight = 0;
for (let i = 0; i < ss.length; ++i) {
    if (ss[i] != se[i]) break;
    if (ss[i] == '8') ++eight
}
console.log(eight)
