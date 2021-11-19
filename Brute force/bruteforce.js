let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync('testText.txt').toString();
let key = arg[2].toString();
let arr = new Array();

for (i = 0; i < str.length; i++){
    if(str.charAt(i) == key.charAt(0)){
        for(j = 0; j < key.length; j++){
            if(str.charAt(i + j) == key.charAt(j)){
                if (j == key.length - 1){
                    arr.push(i + 1);
                }
            }
            else{
                break;
            }
        }
    }
}

console.log(arr.join(', '));
//node bruteforce.js
