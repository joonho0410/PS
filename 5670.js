const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let idx = 0;

while (1) {
    if (idx >= input.length) break;

    const N = Number(input[idx++])
    const words = []
    for (let i = 0; i < N; ++i) {
        words.push(input[idx + i])
    }
    solve(words.map((e) => e.split('')))
    idx += N;
}

function solve(words) {
    const tree = makeTreeObj(words)
    let sum = 0;
    for (word of words) {
        let currentNode = tree[word[0]];
        let cnt = 1;
        for (let i = 1; i < word.length; ++i) {
            const keys = Object.keys(currentNode);
            if (keys.length !== 1) ++cnt; 
            currentNode = currentNode[word[i]]
        }
        sum += cnt;
    }
    console.log((sum / words.length).toFixed(2))
}

function makeTreeObj(words) {
    const tree = {};
    
    for (word of words) {
        let currentNode = tree;
        for (let i = 0; i < word.length; ++i) {
            const cur = word[i]
            if (!currentNode.hasOwnProperty(cur))
                currentNode[cur]= {}
            currentNode = currentNode[cur]
            
            if (i === word.length - 1) currentNode['end'] = true;
        }
    }

    return tree;
}
