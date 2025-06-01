const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const A = input.shift().split(' ').map(Number)
const B = input.shift().split(' ').map(Number)

const map = new Map();

A.forEach((val, idx) => map.set(val, idx))
const ary = B.map((val) => map.get(val))
solve();

function solve() {
    const { update, query } = makeSegmentTree(ary.length)
    const cnts = Array(ary.length).fill(0n)
    let ans = 0n;

    for (val of ary) {
        ans += query(1, 0, ary.length - 1, val, ary.length - 1);
        update(1, 0, ary.length - 1, val, ++cnts[val])
    }
    console.log(String(ans))
}

function makeSegmentTree(size) {
    const tree = Array(size * 4).fill(0n);

    function update(node, left, right, target, diff) {
        if (target < left || right < target) return tree[node];
        if (left === right) return tree[node] = diff

        const mid = Math.floor((left + right) / 2)
        const lnode = node * 2;
        const rnode = node * 2 + 1;
        const lvalue = update(lnode, left, mid, target, diff)
        const rvalue = update(rnode, mid + 1, right, target, diff)
        return tree[node] = lvalue + rvalue;
    }

    // left, right -> 현재구간, start, end -> 보고자하는 구간
    function query(node, left, right, start, end) {
        if (right < start || end < left) return 0n;
        if (start <= left && right <= end) return tree[node];

        const mid = Math.floor((left + right) / 2)
        const lnode = node * 2;
        const rnode = node * 2 + 1;
        const lvalue = query(lnode, left, mid, start, end)
        const rvalue = query(rnode, mid + 1, right, start, end)
        return lvalue + rvalue;
    }

    return { update, query }
}
