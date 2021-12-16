let arg = process.argv;
let fs = require('fs');
let message = fs.readFileSync(arg[2]).toString().toLowerCase();
let shift = arg[3] * 1;
let mf = new Array();
let sf = new Array();
let key = new Array();
let out_code = "";

let length = 0;
for (i = 0; i < message.length; i++){
    if (message[i] != " " && message[i] != '.' && message[i] != '!' && message[i] != '?' && message[i] != '\r' && message[i] != '\n' && message[i] != '…' && message[i] != ',' && message[i] != '-' && message[i] != ';' && message[i] != ':'){
        mf[message.charAt(i)] = 0;
        length++;
    }
}
for (i = 0; i < message.length; i++){
    if (message[i] != " " && message[i] != '.' && message[i] != '!' && message[i] != '?' && message[i] != '\r' && message[i] != '\n' && message[i] != '…' && message[i] != ',' && message[i] != '-' && message[i] != ';' && message[i] != ':'){
        mf[message.charAt(i)]++;
    }
}

let amount = 0;
for(i in mf){
    mf[i] = mf[i]/length;
    amount++
}

let count = 0;
for(i in mf){
    sf[(count + shift) % amount] = i;
    count++;
}

count = 0;
for (i in mf){
    key[i] = sf[count++];
}

for (i = 0; i < message.length; i++){
    if (message[i] != " " && message[i] != '.' && message[i] != '!' && message[i] != '?' && message[i] != '\r' && message[i] != '\n' && message[i] != '…' && message[i] != ',' && message[i] != '-' && message[i] != ';' && message[i] != ':'){
        out_code += key[message.charAt(i)];
    }
    else{
        out_code += message.charAt(i);
    }
}

fs.writeFileSync('textCoded.txt', out_code);

let out_decode = "";
let back_key = new Array();
let input = fs.readFileSync('textCoded.txt').toString();

for (i in key){
    back_key[key[i]] = i;
}

for (i = 0; i < input.length; i++){
    if (input[i] != " " && input[i] != '.' && input[i] != '!' && input[i] != '?' && input[i] != '\r' && input[i] != '\n' && input[i] != '…' && input[i] != ',' && input[i] != '-' && input[i] != ';' && input[i] != ':'){
        out_decode += back_key[input.charAt(i)];
    }
    else{
        out_decode += input.charAt(i);
    }
}

fs.writeFileSync('textDecoded.txt', out_decode);

// node caesar_code-decode.js testText.txt 1