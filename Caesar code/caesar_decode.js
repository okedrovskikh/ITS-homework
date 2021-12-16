let arg = process.argv;
let fs = require('fs');
let message = fs.readFileSync(arg[2]).toString().toLowerCase();
let cf= new Array();
let ef = new Array();
let freq = new  Array();
cf['а'] = 7.998; cf['б'] = 1.592; cf['в'] = 4.533; cf['г'] = 1.687; cf['д'] = 2.977; cf['е'] = 8.483; 
cf['ё'] = 0.013; cf['ж'] = 0.940; cf['з'] = 1.641; cf['и'] = 7.367; cf['й'] = 1.208; cf['к'] = 3.486; 
cf['л'] = 4.343; cf['м'] = 3.203; cf['н'] = 6.700; cf['о'] = 10.983; cf['п'] = 2.804; cf['р'] = 4.746; 
cf['с'] = 5.473; cf['т'] = 6.318; cf['у'] = 2.615; cf['ф'] = 0.267; cf['х'] = 0.966; cf['ц'] = 0.486; 
cf['ч'] = 1.450; cf['ш'] = 0.718;  cf['щ'] = 0.362; cf['ъ'] = 0.038; cf['ы'] = 1.898; cf['ь'] = 1.735; 
cf['э'] = 0.331; cf['ю'] = 0.638; cf['я'] = 2.001;

for (i in cf){
    cf[i] /= 100;
}

length = 0
for (i = 0; i < message.length; i++){
    if (message.charAt(i) != " " && message[i] != '.' && message[i] != '!' && message[i] != '?' && message[i] != '\r' && message[i] != '\n' && message[i] != '…' && message[i] != ',' && message[i] != '-' && message[i] != ';' && message[i] != ':'){
        ef[message.charAt(i)] = 0;
        length++;
    }
}
for (i = 0; i < message.length; i++){
    if (message.charAt(i) != " " && message[i] != '.' && message[i] != '!' && message[i] != '?' && message[i] != '\r' && message[i] != '\n' && message[i] != '…' && message[i] != ',' && message[i] != '-' && message[i] != ';' && message[i] != ':'){
        ef[message.charAt(i)]++;
    }
}

let amount = 0;
for (i in ef){
    ef[i] = ef[i]/length;
    freq[amount++] = ef[i];
}

let shift = 0;
let check_sum;
let min = 2;
let min_shift = 0;
for (i = 0; i <= amount; i++){
    check_sum = 0;
    count = 0;
    for (j in ef){
        check_sum += Math.pow(freq[(count + shift)%amount] - cf[j], 2);
        count++;
    }
    if (min > check_sum){
        min = check_sum;
        min_shift = shift;
    }
    shift++;
}
console.log(min_shift);

let key = new Array();
count = 0;
let move = new Array();
for (i in ef){
    move[(count + min_shift) % amount] = i; 
    count++;
}

count = 0;
for (i in ef){
    key[i] = move[count++];
}

let out = "";
for (i = 0; i < message.length; i++){
    if (message[i] != " " && message[i] != '.' && message[i] != '!' && message[i] != '?' && message[i] != '\r' && message[i] != '\n' && message[i] != '…' && message[i] != ',' && message[i] != '-' && message[i] != ';' && message[i] != ':'){
        out += key[message.charAt(i)];
    }
    else{
        out += message.charAt(i);
    }
}

fs.writeFileSync('textDecoded(noKey).txt', out);
// node caesar_decode.js textCoded.txt
// node caesar_decode.js textDecoded.txt
