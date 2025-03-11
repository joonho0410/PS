const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const ary = input.shift().split('')
const ch = {}
const str = []
let ans = 0;

for (e of ary) {
    if (ch[e]) ++ch[e];
    else ch[e] = 1;
}

recur();
console.log(ans)

function recur() {
    if (str.length === ary.length) {
        ++ans
        return ;
    }

    for (key of Object.keys(ch)) {
        if (ch[key] === 0) continue;
        if (str.length > 0 && str[str.length - 1] === key) continue;
        
        ch[key] -= 1;
        str.push(key)
        recur();
        ch[str.pop()] += 1;
    }
}