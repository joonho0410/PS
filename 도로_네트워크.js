const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const K = Number(input[N - 1])
const adj = Array.from({length : N + 1}, () => [])
const parent = Array.from({length: N + 1}, () =>
    Array.from({length: 20}, () => [0, Infinity, 0])) // [parent, short, long]
const lv = Array(N + 1).fill(0)

for (let i = 0; i < N - 1; ++i) {
    const[s, e, d] = input[i].split(' ').map(Number)
    adj[s].push([e, d])
    adj[e].push([s, d])
    
}
const root = findRoot()
findSL(root);
const ans = []

for (let i = N; i < N + K; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    const [sh, ln] = findAns(s, e)
    ans.push([sh, ln])
}
console.log(ans.map(e => e.join(' ')).join('\n'))

function findRoot() {
    const visit = Array(N + 1).fill(false)
    const s = [[1, 0]]
    visit[1] = true;

    while (s.length > 0) {
        const [n, _] = s.pop();

        let hasNext = false;
        for (next of adj[n]) {
            const [nextCity, _] = next
            if (visit[nextCity]) continue;
            visit[nextCity] = true;
            hasNext = true;
            s.push([nextCity, 0]);
        }
        if (!hasNext) return n;
    }
}

function findSL(root) {
    const s = [root]
    lv[root] = 0;

    while (s.length > 0) {
        const curCity = s.pop();
        
        for (next of adj[curCity]) {
            const [nextCity, len] = next;
            if (nextCity == root || parent[nextCity][0][0] != 0) continue;
            parent[nextCity][0] = [curCity, len, len];
            lv[nextCity] = lv[curCity] + 1;
            s.push(nextCity)
        }
    }

    for (let i = 1; i <= 19; ++i) {
        for (let n = 1; n <= N; ++n) {
            const bro = parent[parent[n][i - 1][0]][i - 1]
            const me = parent[n][i - 1]
            parent[n][i][0] = bro[0]
            parent[n][i][1] = Math.min(me[1], bro[1])
            parent[n][i][2] = Math.max(me[2], bro[2])
        }
    }
}

function findAns(s, e) {
    [s, e] = lv[s] < lv[e] ? [s, e] : [e, s] // s가 더 높이잇다고 가정 lv[s]  < lv[e] 항상
    const dif = lv[e] - lv[s]
    let [sh, ln] = [Infinity, 0];
    // 레벨 맞추기
    for (let i = 19; i >= 0; --i) {
        if (dif & (1 << i)) {
            sh = Math.min(sh, parent[e][i][1])
            ln = Math.max(ln, parent[e][i][2])
            e = parent[e][i][0];
        }
    }
    // 실제 공통위치 찾기
    if (s != e) {
        for (let i = 19; i >= 0; --i){
            if (parent[s][i][0] != parent[e][i][0]) {
                sh = Math.min(sh, parent[s][i][1], parent[e][i][1])
                ln = Math.max(ln, parent[s][i][2], parent[e][i][2])
                s = parent[s][i][0];
                e = parent[e][i][0];
            }
        }
        sh = Math.min(sh, parent[s][0][1], parent[e][0][1])
        ln = Math.max(ln, parent[s][0][2], parent[e][0][2])
    }
    return [sh, ln];
}