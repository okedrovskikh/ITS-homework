let fs = require('fs');
let inText;
let arg = process.argv;
let alph = new Array();
let entropy = 0;
let i;
let n = 0;
let j = 0;

fs.readFile('abrakadabra.txt', function(error, data){
	if (error) throw error;
	inText = data.toString();
	for (i = 0; i < inText.length; i++){
		alph[inText.charAt(i)] = 0;
	}
    for (i = 0; i < inText.length; i++){
		alph[inText.charAt(i)]++;
	}
	while (j < inText.length){
		for (i in alph){
			if (i == inText.charAt(j)){
				n +=1;
			}
		j +=1;
		}
	}
	console.log(n);
	console.log(alph);
	for (i in alph){
		i = alph[i]/inText.length;
		console.log(i);
		entropy += i*(Math.log(i)/Math.log(n)); 
	}
	entropy = -entropy;
	console.log(entropy);
});