const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, D] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(BigInt)

solve();

function solve() {
    const { update, query } = makeSegTree()
    update(1, 0, N - 1, 0, ary[0])

    for (let i = 1; i < N; ++i) {
        const min = i - D < 0 ? 0 : i - D;
        const max = query(1, 0, N - 1, min, i - 1)
        const next = max + ary[i] < ary[i] ? ary[i] : max + ary[i]

        update(1, 0, N - 1, i, next)
    }
    console.log(String(query(1, 0, N - 1, 0, N - 1)))
}

function makeSegTree() {
    const tree = Array(N * 4).fill(-Infinity)

    function update(node, left, right, target, diff) {
        if (target < left || right < target) return tree[node]
        if (left === right) {
            tree[node] = diff;
            return tree[node]
        }
        const mid = Math.floor((left + right) / 2)

        const l = update(node * 2, left, mid, target, diff)
        const r = update(node * 2 + 1, mid + 1, right, target, diff)

        tree[node] = l > r ? l : r
        return tree[node];
    }

    function query(node, left, right, start, end) {
        if (start <= left && right <= end) return tree[node];
        if (end < left || right < start) return -Infinity
        const mid = Math.floor((left + right) / 2)

        const l = query(node * 2, left, mid, start, end);
        const r = query(node * 2 + 1, mid + 1, right, start, end);

        return l > r ? l : r;
    }

    return { update, query } ;
}
