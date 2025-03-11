class Node {
    constructor() {
        this.next = new Map()
    }
}

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ants = input.map((e) => e.split(' '))
const root = new Node('root')

for (ant of ants) {
    const [N, ...baits] = ant;
    let parent = root;

    for (bait of baits) {
        if (parent.next.has(bait)) {
            parent = parent.next.get(bait)
            continue;
        }
        const newOne = new Node()
        parent.next.set(bait, newOne)
        parent = newOne;
    }
}
recur(root, '')

function recur(parent, prefix) {
    const nexts = []
    for (key of parent.next.keys()) {
        nexts.push(key)
    }
    nexts.sort()

    for (next of nexts) {
        console.log(prefix + next)
        recur(parent.next.get(next), prefix + '--')
    }
}
