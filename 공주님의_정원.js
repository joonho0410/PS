const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31]
const calDay = []
let sum = 0;
for (let i = 0; i < 13; ++i) {
    sum += month[i]
    calDay[i] = sum;
}
const [s, e] = [calDay[2] + 1, calDay[10] + 30] // 해당기간에 모두 펴야한다.
let flowers = []

for (let i = 0; i < N; ++i) {
    const [sm, sd, em, ed] = input[i].split(' ').map(Number)
    const start = calDay[sm - 1] + sd <= s ? s : calDay[sm - 1] + sd;
    const end = calDay[em - 1] + ed - 1 >= e ? e : calDay[em - 1] + ed - 1;
    flowers.push([start, end])
}

flowers = flowers.filter((f) => {
    const [st, ed] = f;
    if (ed < s || e < st) return false;
    return true;
})

flowers.sort((a, b) => {
    const [sa, ea] = a;
    const [sb, eb] = b;
    if (sa != sb) return sa - sb;
    return eb - ea;
})


let [curs, cure] = flowers[0];
let ans = 1;

if (curs != s) {
    console.log(0)
    process.exit(0)
}
if (cure >= e) {
    console.log(1)
    process.exit();
}

let nexte = cure;
let f = false;

for (let i = 1; i < flowers.length; ++i) {
    const [fs, fe] = flowers[i]
    if (fs <= cure + 1) {
        if (fe > nexte) nexte = fe;
        if (nexte === e) {
            ++ans;
            break;
        }
        continue;
    }
    if (nexte + 1 < fs) break;
    ++ans;
    cure = nexte;
    --i;
}

nexte === e ? console.log(ans) : console.log(0)