let fs = require('fs');
let inText;
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

	for (i in alph){
		n += 1;
	}
	
	for (i in alph){
		i = alph[i]/inText.length;
		entropy -= i*(Math.log(i)/Math.log(n)); 
	}
	console.log(entropy);
});