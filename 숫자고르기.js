const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = [0, ...input.map(Number)]

const visit = Array(N + 1).fill(false)

for (let i = 1; i <= N; ++i) {
    if (check(i)) visit[i] = true;
}
let ans = []
for (let i = 1; i <= N; ++i){
    if (visit[i]) ans.push(i);
}
console.log(ans.length)
console.log(ans.sort((a, b) => a - b).join('\n'))
function check(n) {
    let ok = false;
    let start = n;

    recur(ary[n])
    if (ok) return true;
    return false;

    function recur(n) {
        const next = ary[n];
        if (visit[next]) {
            if (visit[start]) ok = true;
            return ;
        }
        visit[next] = true;
        recur(next);       
        if (!ok) visit[next] = false; 
    }
}