const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [V, E] = input.shift().split(' ').map(Number)
const roads = Array.from({length : V + 1}, () => Array(V + 1).fill(Infinity))

for (let i = 0; i < E; ++i) {
    const [s, e, d] = input[i].split(' ').map(Number)
    roads[s][e] = d;
}

for (let m = 1; m <= V; ++m){
    for (let s = 1; s <= V; ++s){
        for (let e = 1; e <=V; ++e){
            if (roads[s][m] === Infinity || roads[m][e] === Infinity) continue;
            if (roads[s][e] > roads[s][m] + roads[m][e]) roads[s][e] = roads[s][m] + roads[m][e];
        }
    }
}
let ans = Infinity

for (let s = 1; s <= V; ++s) {
    for (let e = 1; e <= V; ++e) {
        if (s == e) continue;
        if (roads[s][e] == Infinity || roads[e][s] == Infinity) continue;
        ans = Math.min(ans, roads[s][e] + roads[e][s])
    }
}

ans === Infinity ? console.log(-1) : console.log(ans)