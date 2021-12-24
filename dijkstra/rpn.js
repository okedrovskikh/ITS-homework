let fs = require('fs')
let arg = process.argv;
let input = arg[2].toString();
let str = '';
let djst = new Array();
let stack = new Array();

let priority = {
    '(': 0,
    ')': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    's': 3
};

for (let i = 0; i < input.length; i++) {
    if (isNaN(input.charAt(i) * 1) && input.charAt(i) != '.'){
        if (str != ''){
            djst.push(str * 1);
        }
        str = '';
        if (input.charAt(i) == '(') {
            stack.push('(');
        }  
        else if (input.charAt(i) == ')') {
            while (stack[stack.length - 1] != '(') {
                djst.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.pop();
        } 
        else if (stack.length == 0 || priority[input.charAt(i)] >= priority[stack[stack.length - 1]]) {
            stack.push(input.charAt(i))
        } 
        else {
            while (stack[stack.length - 1] != '(' && stack.length) {
                djst.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.push(input.charAt(i));
        }
    }
    else{
        str += input.charAt(i);
    }
}
if (str != ''){
    djst.push(str * 1);
}
while (stack.length) {
    djst.push(stack[stack.length - 1]);
    stack.pop()
}

console.log(djst);

for (let i = 0; i < djst.length; i++) {
    if (isNaN(djst[i]) * 1){
        if (djst[i] == '+'){
            djst[i - 2] = djst[i - 2] + djst[i - 1]; 
            djst.splice(i - 1, 2);
            i -= 2;
        }
        else if (djst[i] == '-'){
            djst[i - 2] = djst[i - 2] - djst[i - 1];
            djst.splice(i - 1, 2);
            i -= 2;
        }
        else if (djst[i] == '*'){
            djst[i - 2] = djst[i - 2] * djst[i - 1]; 
            djst.splice(i - 1, 2);
            i -= 2;
        }
        else if (djst[i] == 's'){
            djst[i - 2] = djst[i - 2] ** djst[i - 1];
            djst.splice(i - 1, 2); 
            i -= 2;
        }
        else if (djst[i] == '/'){
            djst[i - 2] = djst[i - 2] / djst[i - 1];
            djst.splice(i - 1, 2);
            i -= 2; 
        }
        else {
            break;
        }
    }
}

console.log(djst);

for(let i = 0; i < input.length; i++) {
    input=input.replace("s", "**");
}


console.log(djst[0]);
console.log(eval(input));

// node rpn.js (6+10-4)/(1+1*2)+7^3*9
