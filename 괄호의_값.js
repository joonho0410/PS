const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('')

let op = []
let sum = [1]
let stack =[]

for (let i = 0; i < input.length; ++i) {    
    const cur = input[i];
    if (cur == '(' || cur == '[') {
        if (i > 0 && (input[i - 1] == ']' || input[i - 1] == ')')) {
            op.push(1);
            sum.push(1);
        }
        stack.push(cur);
        if (cur == '(')
            op.push(2)
        if (cur == '[')
            op.push(3)
    }
    if (cur == ')'){
        while (1) {
            if (stack.length === 0) {
                console.log(0)
                return ;
            }
            if (stack.pop() === '('){
                let oper = op.pop()
                while (oper === 1){
                    sum.push(sum.pop() + sum.pop())
                    oper = op.pop();
                }
                sum.push(sum.pop() * oper)
                break;
            }
        }
    }
    if (cur == ']') {
        while (1) {
            if (stack.length === 0) {
                console.log(0)
                return ;
            }
            if (stack.pop() === '['){
                let oper = op.pop()
                while (oper === 1){
                    sum.push(sum.pop() + sum.pop())
                    oper = op.pop();
                }
                sum.push(sum.pop() * oper)
                break;
            }
        }
    }
}
while (op.length > 0) {
    if (op[op.length - 1] != 1) break;
    op.pop();
    sum.push(sum.pop() + sum.pop());
}
if (op.length > 0) console.log(0)
else console.log(sum[0])