const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [ N, M, K ] = input.shift().split(' ').map(Number)
const ary = []
for (let i = 0; i < N; ++i) ary.push(Number(input[i]))
input.splice(0, N)

const commands = []
for (let i = 0; i < M + K; ++i) {
    const [a, b, c, d] = input[i].split(' ').map(Number)
    commands.push([a, b, c, d])
}

solve();

function solve() {
    const { lazyQuery, lazyUpdate } = makeLazySegTree();
    
    for (const command of commands) {
        const [a, b, c, d] = command;
        if (a === 1) lazyUpdate(1, 0, ary.length - 1, b - 1, c - 1, BigInt(d))
        if (a === 2) console.log(String(lazyQuery(1, 0, ary.length - 1, b - 1, c - 1)))
    }
}

function makeLazySegTree() {
    const tree = Array(ary.length * 4).fill(0n)
    const lazy = Array(ary.length * 4).fill(0n)

    init(1, 0, ary.length - 1)
    function init(node, start, end) {
        if (start === end) return tree[node] = BigInt(ary[start])
        const mid = Math.floor((start + end) / 2)

        const left = init(2 * node, start, mid)
        const right = init(2 * node + 1, mid + 1, end)

        return tree[node] = left + right
    }

    function propagation(node, start, end) {
        if (lazy[node] !== 0n) {
            tree[node] += BigInt(end - start + 1) * lazy[node];
            if (start !== end) {
                lazy[node * 2] += lazy[node]
                lazy[node * 2 + 1] += lazy[node]
            }
        }
        lazy[node] = 0n;
    }

    function lazyUpdate(node, start, end, left, right, diff) {
        propagation(node, start, end)

        if (end < left || right < start) return;
        if (left <= start && end <= right) {
            if (start !== end) {
                lazy[node * 2] += diff;
                lazy[node * 2 + 1] += diff;
            }
            tree[node] += BigInt(end - start + 1) * diff
            return ;
        }

        const mid = Math.floor((start + end) / 2)
        lazyUpdate(2 * node, start, mid, left, right, diff)
        lazyUpdate(2 * node + 1, mid + 1, end, left, right, diff)
        tree[node] = tree[node * 2] + tree[node * 2 + 1]
    }

    function lazyQuery(node, start, end, left, right) {
        propagation(node, start, end)

        if (end < left || right < start) return 0n;
        if (left <= start && end <= right) return tree[node]

        const mid = Math.floor((start + end) / 2)
        const l = lazyQuery(2 * node, start, mid, left, right)
        const r = lazyQuery(2 * node + 1, mid + 1, end, left, right)
        
        return l + r
    }

    return { lazyUpdate, lazyQuery }
}
