const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input.shift());
const M = Number(input.shift());

const isBasic = Array(N + 1).fill(true);
const degree = Array(N + 1).fill(0);
const adj = Array.from({ length: N + 1 }, () => []);
const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

isBasic[0] = false;
for (let i = 0; i < M; ++i) {
  const [x, y, k] = input[i].split(' ').map(Number);
  adj[y].push([x, k]);
  degree[x] += 1;
  isBasic[x] = false;
}

solve();
function solve() {
  const q = [];

  for (let i = 1; i <= N; ++i) {
    if (!isBasic[i]) continue;
    q.push(i);
    dp[i][i] = 1;
  }
  let idx = 0;

  while (q.length > idx) {
    const node = q[idx++];

    for (let [next, cnt] of adj[node]) {
      if (--degree[next] === 0) q.push(next);
      dp[next] = dp[next].map((e, idx) => e + cnt * dp[node][idx]);
    }
  }
}

dp[N].forEach((e, idx) => {
  if (!isBasic[idx]) return;
  console.log(`${idx} ${e}`);
});
