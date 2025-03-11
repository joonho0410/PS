const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [A, B] = input.shift().split(' ')

const na = Number(A)
const nb = Number(B)
const start = A.length;
const end = B.length;
const ary = []
let ans = 0;

for (let i = start; i <= end; ++i) {
    dfs(i)
}

console.log(ans)

function dfs(target) {
    if (target === ary.length) {
        const num = Number(ary.join(''))
        if (num <= nb && num >= na) ++ans;
        return ;
    }
    ary.push('4')
    dfs(target)
    ary.pop();
    ary.push('7')
    dfs(target)
    ary.pop();
}