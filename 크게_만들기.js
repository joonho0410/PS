const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, K] = input.shift().split(' ').map(Number)
const s = input.shift().split('').map(Number)
const visit = Array(s).fill(false)
const stack = [];

let delCnt  = 0;

for (let i = 0; i < s.length; ++i) {
    const [idx, val] = [i, s[i]];
    while (1) {
        const len = stack.length;
        if (delCnt == K) break;
        if (len == 0) break;
        if (stack[len - 1][1] >= val) break;
        stack.pop();
        delCnt++;
    }
    stack.push([idx, val]);
}

while (delCnt < K){
    stack.pop();
    delCnt++;
}

let ans = []
for (node of stack) {
    ans.push(node[1]);
}
console.log(ans.join(''))