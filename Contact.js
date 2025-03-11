const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const T = Number(input.shift())

const reg = /^(100+1+|01)+$/
const ans = []
for (let i = 0 ; i < T; ++i) {
    let str = String(input[i])
    reg.test(str) ? ans.push("YES") : ans.push("NO")
}
console.log(ans.join('\n'))