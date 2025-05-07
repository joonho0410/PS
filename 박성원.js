const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input.shift());
const ary = [];
for (let i = 0; i < N; ++i) {
  ary.push(input[i]);
}
const K = Number(input[N]);

solve();

function solve() {
  const dp = bfs();
  const ans = dp[Math.pow(2, N) - 1][0];
  if (ans === 0n) {
    console.log('0/1');
    return;
  }
  const total = getTotal();
  const div = GCD(total, ans);
  console.log(`${ans / div}/${total / div}`);
}

function getTotal() {
  let sum = 1n;
  let temp = N;

  while (temp > 0) {
    sum = sum * BigInt(temp);
    temp--;
  }

  return sum;
}

function GCD(big, small) {
  while (1) {
    const ret = big % small;
    if (ret === 0n) break;
    big = small;
    small = ret;
  }
  return small;
}

function bfs() {
  const visit = Array(Math.pow(2, N)).fill(false);
  const dp = Array.from({ length: Math.pow(2, N) }, () => Array(K).fill(0n));
  const q = [];
  let idx = 0;

  for (let i = 0; i < N; ++i) {
    dp[1 << i][BigInt(ary[i]) % BigInt(K)] = 1n;
    q.push(1 << i);
  }

  while (q.length > idx) {
    const bitmask = q[idx++];
    const offsetlen = calLength(bitmask);

    for (let i = 0; i < N; ++i) {
      const curBit = 1 << i;
      if (bitmask & curBit) continue;
      const nextMask = bitmask | curBit;
      const curMod = calcMod(ary[i], offsetlen);

      for (let j = 0; j < K; ++j) {
        if (dp[bitmask][j] === 0n) continue;
        const nextMod = (j + curMod) % K;
        dp[nextMask][nextMod] += dp[bitmask][j];
      }
      if (!visit[nextMask]) {
        visit[nextMask] = true;
        q.push(nextMask);
      }
    }
  }

  return dp;
}

function calcMod(num, length) {
  let str = String(num);
  while (length--) {
    str += '0';
  }
  const n = BigInt(str);
  return Number(n % BigInt(K));
}

function calLength(bitmask) {
  let len = 0;

  for (let i = 0; i < N; ++i) {
    const curBit = 1 << i;
    if ((bitmask & curBit) === 0) continue;
    len += ary[i].length;
  }

  return len;
}
