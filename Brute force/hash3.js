let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync('testText.txt').toString();
let key = arg[2].toString();
let arr = new Array();
let codeStr = 0, codeKey = 0;
let len_key = key.length, len_str = str.length;

for (let i = 0; i < len_key; i++){
    codeKey += key.charCodeAt(i) * Math.pow(2, len_key - i - 1);
    codeStr += str.charCodeAt(i) * Math.pow(2, len_key - i - 1);
}

for (i = 1; i <= len_str - len_key + 1; i++){
    if (codeStr == codeKey){
        for (j = 0; j < len_key ; j++){
            if(str.charAt(j + i - 1) == key.charAt(j)){
                if (j == len_key - 1){
                    arr.push(i - 1);
                }
            }
            else{
                break;
            }
        }
    }
    codeStr = (codeStr - str.charCodeAt(i - 1) * Math.pow(2, len_key - 1)) * 2 + str.charCodeAt(len_key + i - 1);
}

console.log(arr.join(', '));
// node hash3.js