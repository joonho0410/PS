const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const M = input.shift().split(' ').map(Number)

const updates = []
const querys = []
const { query, update } = makeSegmentTree(ary);

let cnt = 0;
for (let i = 0; i < M; ++i) {
    const [cmd, a, b, c] = input[i].split(' ').map(Number)
    if (cmd === 1) {
        updates.push([a - 1, b])
    }
    if (cmd === 2) {
        querys.push([a, b - 1, c - 1, cnt++])
    }
}

const ans = Array(cnt);

querys.sort((a, b) => a[0] - b[0])

let updateCount = 0;

for (const q of querys) {
    const [a, b, c, idx] = q;
    while (updateCount < a) {
        const [i, v] = updates[updateCount++]
        update(1, 0, ary.length - 1, i, BigInt(v));
    }
    ans[idx] = query(1, 0, ary.length - 1, b, c);
}

console.log(ans.join('\n'))

function makeSegmentTree(ary) {
    const tree = Array.from({length: ary.length * 4}, () => [])

    init(1, 0, ary.length - 1)
    function init(node, left, right){
        if (left === right) return tree[node] = BigInt(ary[left])

        const mid = Math.floor((left + right) / 2)
        const l = init(node * 2, left, mid)
        const r = init(node * 2 + 1, mid + 1, right)
        
        return tree[node] = l + r;
    }

    // left, right -> 현재범위
    // start , end -> 보고자 하는 범위
    function query(node, left, right, start, end) {
        if (start <= left && right <= end) return tree[node];
        if (end < left || right < start) return 0n;

        const mid = Math.floor((left + right) / 2)
        const l = query(node * 2, left, mid, start, end)
        const r = query(node * 2 + 1, mid + 1, right, start, end)

        return l + r;
    }

    function update(node, left, right, target, diff) {
        if (target < left || right < target) return tree[node];
        if (left === right) return tree[node] = diff;

        const mid = Math.floor((left + right) / 2)
        const l = update(node * 2, left, mid, target, diff)
        const r = update(node * 2 + 1, mid + 1, right, target, diff)
        
        return tree[node] = l + r;
    }

    return { query, update }
}
