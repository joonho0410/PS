const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const p = Array(200001).fill(0)

while (1) {
    const [M, N] = input.shift().split(' ').map(Number)
    if (M === 0 && N === 0) break;
    const roads = input.slice(0, N).map((e) => e.split(' ').map(Number))
    for (let i = 0; i <= M; ++i) p[i] = i;
    roads.sort((a, b) => {
        return a[2] - b[2];
    })

    let ans = 0;
    for (road of roads) {
        const [x, y, z] = road;
        if (merge(x, y)) continue;
        ans += z;
    }
    
    console.log(ans)
    input.splice(0, N)
}

function findP(a) {
    if (p[a] === a) return a;
    p[a] = findP(p[a]);
    return p[a];
}

function merge(a, b) {
    a = findP(a)
    b = findP(b)
    if (a === b) return false;
    p[a] = b;
    return true;
}