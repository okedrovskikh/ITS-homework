let arg = process.argv;
let str = arg[2].toString();
let strLen = str.length;
let key = arg[3].toString();
let keyLen = key.length;
let alph = new Array();
let del = new Array(strLen + 1);
let result = new Array();
let currLen = 0;

for (i = 0; i < keyLen; i++){
    alph[key.charAt(i)] = 0; 
}
console.log(alph);

for (i = 0; i <= keyLen; i++){
    del[i] = new Array();
}
for (i in alph){
    del[0][i] = 0;
}
for (i = 0; i < keyLen; i++){
    let prev = del[i][key.charAt(i)];
    del[i][key.charAt(i)] = i + 1;
    for (j in alph){
        del[i + 1][j] = del[prev][j];
    }
}
console.log(del);

for (let i = 0; i < strLen; i++){
    try{
        currLen = del[currLen][str.charAt(i)];
    }
    catch(TypeError){
        currLen = 0;
    }
    if (currLen == keyLen){
        result.push(i - keyLen + 1);
    }
}

console.log(result.join(', '));


// node automata.js аnananaananas ananas
