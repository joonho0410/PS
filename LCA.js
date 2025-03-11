const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const visit = Array(N + 1).fill(false)
const adj = Array.from({length : N + 1}, () => [])
const p = Array.from({length : N + 1}, () => Array(20).fill(0))
const nlv = Array(N + 1).fill(0)

for (let i = 0; i < N - 1; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    adj[a].push(b)
    adj[b].push(a);
}

makeTree();

const M = Number(input[N - 1])
let ans = []
for (let i = N; i < N + M; ++i){
    const [a, b] = input[i].split(' ').map(Number)
    ans.push(findAns(a, b));
}
console.log(ans.join('\n'))

function makeTree() {
    dfs(1, 0);

    for (let i = 1; i < 20; ++i) {
        for (let n = 1; n <= N; ++n) {
            p[n][i] = p[p[n][i - 1]][i - 1]; 
        }
    }
}

function dfs(n, parent) {
    visit[n] = true;
    p[n][0] = parent;
    nlv[n] = nlv[parent] + 1;

    for (next of adj[n]) {
        if (visit[next]) continue;
        dfs(next, n);
    }
}

function findAns(a, b) {
    [a, b] = nlv[a] < nlv[b] ? [a, b] : [b, a] // a의 레벨이 더 낮도록 (더 높은위치)
    let dif = nlv[b] - nlv[a];
    // lv 맞추기 작업
    for (let i = 19; i > -1; --i) {
        if (dif & (1 << i)) b = p[b][i];
    }

    if (a != b) {
        for (let i = 19; i > -1; --i) {
            if (p[a][i] != p[b][i]){
                a = p[a][i];
                b = p[b][i];
            }
        }
        a = p[a][0];
    }
    return a
}