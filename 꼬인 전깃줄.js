const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input.shift());
const ary = input.shift().split(' ').map(Number);

const ans = [ary[0]];

for (let i = 1; i < ary.length; ++i) {
  const idx = bisect(ary[i]);
  if (idx >= ans.length) ans.push(ary[i]);
  else ans[idx] = ary[i];
}

console.log(N - ans.length);

// upperBound
function bisect(target) {
  let s = 0;
  let e = ans.length - 1;

  while (s <= e) {
    let mid = Math.floor((s + e) / 2);

    if (ans[mid] > target) e = mid - 1;
    else s = mid + 1;
  }

  return s;
}
