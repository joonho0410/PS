const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const lines = []

const p = Array(N).fill(0).map((e, idx) => idx)

for (let i = 0; i < N; ++i) {
    lines.push(input[i].split(' ').map(Number))
}

solve();

function solve() {
    for (let i = 0; i < lines.length; ++i) {
        for (let j = i + 1; j < lines.length; ++j) {
            if (isCross(...lines[i], ...lines[j])) {
                merge(i, j)
            }
        }
    }
    findAns();
}

function findAns() {
    const map = new Map()
    

    for (let i = 0; i < N; ++i) {
        const group = findP(i)
        if (!map.has(group)) map.set(group, 0)
        map.set(group, map.get(group) + 1)
    }
    
    let max = -Infinity
    for ([key, value] of map) {
        max = Math.max(max, value)
    }
    console.log(map.size)
    console.log(max)
}



function isCross(x1, y1, x2, y2, x3, y3, x4, y4) {
    const v1 = [x1 - x2, y1 - y2]
    const v2 = [x1 - x3, y1 - y3]
    const v3 = [x1 - x4, y1 - y4]

    const va = [x3 - x4, y3 - y4]
    const vb = [x3 - x1, y3 - y1]
    const vc = [x3 - x2, y3 - y2]

    const [r1, r2] = [CCW(v1, v2), CCW(v1, v3)]
    const [ra, rb] = [CCW(va, vb), CCW(va, vc)]

    if (r1 === 0 && r2 === 0) {
        const [ maxX, minX ] = [ Math.max(x1, x2), Math.min(x1, x2) ]
        const [ maxY, minY ] = [ Math.max(y1, y2), Math.min(y1, y2) ]

        if (
            (Math.max(x3, x4) >= minX) &&
            (Math.min(x3, x4) <= maxX) &&
            (Math.max(y3, y4) >= minY) &&
            (Math.min(y3, y4) <= maxY)
        ) return true;

        return false;
    }

    return (r1 * r2 <= 0 && ra * rb <= 0)
}

function CCW(v1, v2) {
    const ret = v1[0] * v2[1] - v1[1] * v2[0]
    
    if (ret < 0) return -1;
    if (ret === 0) return 0;
    return 1;
}

function findP(a) {
    if (p[a] === a) return a;
    p[a] = findP(p[a])
    return p[a];
}

function merge(a, b) {
    a = findP(a);
    b = findP(b);
    if (a === b) return false;
    if (a < b) p[b] = a;
    else p[a] = b;

    return true;
}
