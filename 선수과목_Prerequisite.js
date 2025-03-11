const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const degree = Array(N + 1).fill(0);
const adj = Array.from({length : N + 1}, () => [])
const ans = Array(N + 1).fill(1);

for (let i = 0; i < M; ++i) {
    const [b, n] = input[i].split(' ');
    adj[b].push(n);
    ++degree[n];    
}

const q = []
for (let i = 1; i <= N; ++i) {
    if (degree[i] !== 0) continue;
    q.push(i);
    ans[i] = 1;
}
let idx = 0;

while (q.length > idx) {
    const subject = q[idx++];

    for (next of adj[subject]) {
        --degree[next];
        if (degree[next] === 0) {
            q.push(next);
            ans[next] = ans[subject] + 1;
        }
    }
}
ans.shift();
console.log(ans.join(' '))

