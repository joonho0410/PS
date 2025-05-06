const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input.shift());
const ary = input
  .shift()
  .split(' ')
  .map((val, idx) => [Number(val), idx + 1]);
const Q = Number(input.shift());
const queries = input.map((e) => e.split(' ').map(Number));

solve();

function solve() {
  const { query, update } = makeSegmentTree();
  const ans = [];

  for (const [cmd, a, b] of queries) {
    if (cmd === 1) update(1, 0, ary.length - 1, a - 1, [b, a]);
    if (cmd === 2) {
      const [val, idx] = query(1, 0, ary.length - 1, a - 1, b - 1);
      ans.push(idx);
    }
  }
  console.log(ans.join('\n'));
}

function makeSegmentTree() {
  const InvalidValue = [Infinity, Infinity];
  const tree = Array(ary.length * 4).fill(InvalidValue);

  init(1, 0, ary.length - 1);

  function init(node, start, end) {
    if (start === end) return (tree[node] = ary[start]);

    const mid = Math.floor((start + end) / 2);
    const left = node * 2;
    const right = node * 2 + 1;
    init(left, start, mid);
    init(right, mid + 1, end);

    tree[node] = findSmall(tree[left], tree[right]);
  }

  // (treeIdx, 보고있는 구간, 찾고 있는 구간)
  function query(node, start, end, left, right) {
    if (right < start || end < left) return InvalidValue;
    if (left <= start && end <= right) return tree[node];
    const mid = Math.floor((start + end) / 2);

    const l = query(node * 2, start, mid, left, right);
    const r = query(node * 2 + 1, mid + 1, end, left, right);

    return findSmall(l, r);
  }

  function update(node, start, end, targetIdx, diff) {
    if (start === end) return (tree[node] = diff);

    const mid = Math.floor((start + end) / 2);
    const left = node * 2;
    const right = node * 2 + 1;
    if (start <= targetIdx && targetIdx <= mid)
      update(left, start, mid, targetIdx, diff);
    if (mid + 1 <= targetIdx && targetIdx <= end)
      update(right, mid + 1, end, targetIdx, diff);

    return (tree[node] = findSmall(tree[left], tree[right]));
  }

  function findSmall(left, right) {
    if (left[0] === right[0]) return left[1] < right[1] ? left : right;
    return left[0] < right[0] ? left : right;
  }

  return { query, update };
}
