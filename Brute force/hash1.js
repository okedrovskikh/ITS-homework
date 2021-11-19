let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync('testText.txt').toString();
let key = arg[2].toString();
let arr = new Array();
let codeStr = 0, codeKey = 0;
let len_key = key.length;

for (i = 0; i < len_key; i++){
    codeKey += key.charCodeAt(i);
    codeStr += str.charCodeAt(i);
}

for(i = 1; i < str.length; i++){
    if (i > 1){
        codeStr = codeStr - str.charCodeAt(i - 2) + str.charCodeAt(i + key.length - 2);
    }
    if(codeStr == codeKey){
        for (j = 0; j < len_key; j++){
            if(str.charAt(j + i - 1) == key.charAt(j)){
                if (j == len_key - 1){
                    arr.push(i);
                }
            }
            else{
                break;
            }
        }
    }
}

console.log(arr.join(', '));
//node hash1.js
