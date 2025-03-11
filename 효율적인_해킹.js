const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const adj = Array.from({length: N + 1}, () => [])
const visit = Array(N + 1).fill(false)
let ans = []
let max = 0;

for (let i = 0; i < M; ++i) {
    const [A, B] = input[i].split(' ').map(Number)
    adj[B].push(A);
}

for (let i = 1; i <= N; ++i) {
    init();
    const ret = dfs(i)
    if (ret > max) {max = ret; ans = [i];}
    else if (ret == max) ans.push(i);
}

console.log(ans.sort((a, b) => a - b).join(' '))

function init() {
    for (let i = 0 ; i <= N; ++i)
        visit[i] = false;
}

function dfs(n) {
    visit[n] = true;

    let ret = 1;
    for (let i = 0; i < adj[n].length; ++i) {
        if (visit[adj[n][i]]) continue;
        ret += dfs(adj[n][i])
    }
    return ret;
}