const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const bool =[0]
const querys = []
for (let i = 0; i < M; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    querys.push([a, b])
}

recur();
console.log(0);

function recur() {
    if (bool.length === N + 1) {
        if (check()) {
            console.log(1)
            process.exit()
        };
        return ;
    }
    bool.push(1);
    recur();
    bool.pop();
    bool.push(0)
    recur();
    bool.pop();
}

function check() {
    for (query of querys) {
        const [a, b] = query;
        const left = a > 0 ? bool[a] : !bool[-a]
        const right = b > 0 ? bool[b] : !bool[-b]
        if (!(left || right)) return false;
    }
    return true;
}
1
