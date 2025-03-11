const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dp = Array.from({length : 11}, () => Array(10).fill(0))
const target = Number(input.shift()) + 1

// dp[len][head] = head로 시작하는 길이가 len 인 만족하는 갯수;

for (let i = 0; i < 10; ++i){
    dp[1][i] = 1;
}

for (let i = 2; i < 11; ++i) {
    dp[i][i - 1] = 1;
    for (let j = i; j < 10; ++j) {
        let t = j - 1;
        while (t >= 0) {
            dp[i][j] += dp[i - 1][t]
            t--;
        }
    }
}

let ans = []
let sum = 0;
for (let i = 1; i <= 10; ++i) {
    for (let j = 0; j < 10; ++j) {
        if (sum + dp[i][j] >= target) {
            ans.push(j)
            findAns(i - 1, j, target - sum)
            console.log(ans.join(''))
            return ;
        }
        sum += dp[i][j];
    }
}

function findAns(len, head, idx) {
    if (len == 0) return; 
    if (idx == 0) {
        for (let i = len - 1; i >= 0; --i) ans.push(i);
        return ;
    }

    let sum = 0;
    for (let j = 0; j < head; ++j) {
        if (sum + dp[len][j] >= idx ) {
            ans.push(j)
            findAns(len - 1, j, idx - sum)
            return ;
        }
        sum += dp[len][j];
    }
}

console.log(-1)