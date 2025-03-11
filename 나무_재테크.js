const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let [N, M, K] = input.shift().split(' ').map(Number);
const A = []
const map = Array.from({length: N}, () => Array(N).fill(5))
const tree = []

for (let i = 0; i < N; ++i){
    A.push(input[i].split(' ').map(Number))
}
input.splice(0, N);

for (let i = 0; i < M; ++i) {
    let [r, c, age] = input[i].split(' ').map(Number)
    r -= 1;
    c -= 1;
    tree.push([r, c, age])
}

while (K > 0) {
    
    K -= 1;
}