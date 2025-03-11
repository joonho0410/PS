const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let [N, S, M] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)
const visit = Array.from({length: N + 1}, () => Array(M + 1).fill(false)) // [n번째곡][현재볼륨]

visit[0][S] = true;
for (let i = 0; i < ary.length; ++i) {
    const dif = ary[i];

    for (let j = 0; j <= M; ++j) {
        if (!visit[i][j]) continue;
        if (j + dif <= M) visit[i + 1][j + dif] = true;
        if (j - dif >= 0) visit[i + 1][j - dif] = true;
    }
}

let max = -1;

for (let i = 0; i <= M; ++i){
    if (visit[N][i]) max = i;
}
console.log(max);