const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const M = Number(input.shift())

const tree = Array.from({length : N * 4}, () => [Infinity, Infinity]) //[idx, val]

// 트리 초기화
init(0, ary.length - 1, 1);

for (let i = 0; i < M; ++i) {
    const querys = input[i].split(' ').map(Number)
    
    if (querys[0] === 1) update(0, ary.length - 1, 1, querys[1] - 1, querys[2])
    if (querys[0] === 2) console.log(tree[1][0] + 1)
}

function init(start, end, node) {
    if (start === end) return tree[node] = [start, ary[start]];
    const mid = Math.floor((start + end) / 2);
    
    // left, right
    const left = init(start, mid, node * 2)
    const right = init(mid + 1, end, node * 2 + 1)
    return tree[node] = cmp(left, right)
}

function update(start, end, node, target, dif) {
    if (target < start || target > end) return tree[node];
    if (start === end) return tree[node] = [start, dif];

    const mid = Math.floor((start + end) / 2);
    const left = update(start, mid, 2 * node, target, dif);
    const right = update(mid + 1, end, 2 * node + 1, target, dif)
    return tree[node] = cmp(left, right);
}

function cmp(a, b) {
    if (a[1] < b[1]) return a;
    if (b[1] < a[1]) return b;
    if (a[0] < b[0]) return a;
    return b;
}
