const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const T = Number(input.shift())

for (let i = 0; i < T; ++i) {
    const N = Number(input[0])
    const used = Array(N).fill(false)
    const dots = []
    const c1 = []
    let ans = Infinity

    for (let j = 0; j < N; ++j) dots.push(input[j + 1].split(' ').map(Number))
    recur(0);
    input.splice(0, N + 1)
    console.log(Math.sqrt(ans))

    function recur(idx) {
        if (c1.length === N / 2) {
            const selected = Array(N).fill(false)
            c1.forEach((e) => selected[e] = true)
            let [sx, sy] = [0, 0]
            let [x, y] = [0, 0]
            for (let i = 0; i < N; ++i) {
                if (selected[i]) {
                    sx += dots[i][0]
                    sy += dots[i][1]
                } else {
                    x += dots[i][0]
                    y += dots[i][1]
                }
            }
            ans = Math.min(ans, (sx - x) * (sx - x) + (sy - y) * (sy - y))
            return ;
        }
        if (idx >= N) return ;
        for (let i = idx; i < N; ++i) {
            if (used[i]) continue;
            used[i] = true;
            c1.push(i);
            recur(i + 1);
            c1.pop(i)
            used[i] = false;
        }
    }
}
