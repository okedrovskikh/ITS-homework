let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync('testText.txt').toString();
let key = arg[2].toString();
let arr = new Array();
let codeStr = 0, codeKey = 0;
let len_key = key.length, len_str = str.length;

for (let i = 0; i < len_key; i++){
    codeKey += key.charCodeAt(i) * key.charCodeAt(i);
    codeStr += str.charCodeAt(i) * str.charCodeAt(i);
}

let i = 1;
while (i <= len_str - len_key + 1) {
    if (codeKey == codeStr) {
        let j = 0;
        while (str.charAt(i - 1 + j) === key.charAt(j)){
            j++
            if (j == len_key){
                arr.push(i - 1);
                break;
            }
        }
    }
    codeStr = (codeStr - str.charCodeAt(i - 1) * str.charCodeAt(i - 1)) + str.charCodeAt(i - 1 + len_key) * str.charCodeAt(i - 1 + len_key) ;
    i++;
}

console.log(arr.join(', '));
//node hash2.js