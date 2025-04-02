const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, Q] = input.shift().split(' ').map(Number)
const woods = []

for (let i = 0; i < N; ++i) {
    const [x1, x2, h] = input[i].split(' ').map(Number)
    woods.push([x1, x2, i])
}

woods.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]
    if (a[1] !== b[1]) return a[1] - b[1]
    return a[2] - b[2]
})
input.splice(0, N);
solve();


function solve() {
    const visit = Array(woods.length).fill(0)
    let id = 1;
    visit[woods[0][2]] = id; 
    let curE = woods[0][1];
    
    for (let i = 1; i < woods.length; ++i) {
        const [s, e, h] = woods[i];
        if (curE < s) {
            visit[woods[i][2]] = ++id;
            curE = e;
            continue;
        } 
        visit[woods[i][2]] = id;
        curE = Math.max(e, curE);
    }

    for (let i = 0; i < Q; ++i) {
        const [a, b] = input[i].split(' ').map(Number)   
        console.log (visit[a - 1] === visit[b - 1] ? 1 : 0)
    }
}
