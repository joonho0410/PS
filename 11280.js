const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)

const OFFSET = N
const adj = Array.from({length : 2 * N + 1}, () => [])
const visited = Array(2 * N + 1).fill(0)
const finished = Array(2 * N + 1).fill(false)

let id = 0;

for (let i = 0; i < M; ++i) {
    let [a, b] = input[i].split(' ').map(Number)
    a = makePositive(a)
    b = makePositive(b)
    adj[makeNegative(a)].push(b)
    adj[makeNegative(b)].push(a)
}

solve();

function solve() {
    let ans = true;
    const stack = []
    for (let i = 1; i <= 2 * N; ++i) {
        if (visited[i] === 0) SSC(i)
    }
    
    console.log(ans ? 1 : 0)

    function SSC(node) {
        visited[node] = ++id;
        stack.push(node);

        let minIdx = visited[node]

        for (const next of adj[node]) {
            if (visited[next] === 0) {
                minIdx = Math.min(minIdx, SSC(next));
                continue;
            }
            if (!finished[next])
                minIdx = Math.min(minIdx, visited[next])
        }

        if (minIdx === visited[node]) {
            const cycle = new Set()
            while (1) {
                const top = stack.pop();
                finished[top] = true;
                cycle.add(top);
                if (top === node) break;
            }
            if (checkInvalidCycle(cycle))
                ans = false;
        }
        return minIdx;
    }
}

function checkInvalidCycle(cycle) {
    for (const val of cycle) {
        if (cycle.has(OFFSET + val)) return true;
    }
    return false;
}

function makePositive(n) {
    if (n < 0) return OFFSET - n;
    return n;
}
function makeNegative(n) {
    if (n > N) return n - OFFSET;
    return n + OFFSET;
}

