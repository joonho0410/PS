const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const p = Array(N + 1).fill(0)

const roads = [] 

for (let i = 0; i <= M; ++i) {
    const [here, there, condition] = input[i].split(' ').map(Number)
    roads.push([here, there, condition])
}

const sortMin = [...roads].sort((a, b) => b[2] - a[2])
const sortMax = [...roads].sort((a, b) => a[2] - b[2])

const minimum = findRoads(sortMin)
const maximum = findRoads(sortMax)

console.log(Math.pow(maximum, 2) - Math.pow(minimum, 2))

function findRoads(ary) {
    let asc = 0;
    for (let i = 0; i <= N; ++i) p[i] = i;
    for (road of ary) {
        const [here, there, condition] = road;
        if (!merge(here, there)) continue;
        if (condition === 0) ++asc;
    }
    return asc;
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
    p[b] = a; 
    return true;
}