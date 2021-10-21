let fs = require('fs');
let arg = process.argv;
let inText;
let inText1;
let inText2;
let out = '';
let i = 0, n = 1, b = 0;


fs.readFile('code.txt', function(error, data) {
	if (error) throw error;
	inText = data.toString();
	while (i < inText.length){
		if (inText.charAt(i) == '#'){
			while (b < inText.charCodeAt(i + 1)) {
				out = out + inText.charAt(i + 2);
			b +=1;
			}
		i +=2;
		b = 0;
		}
		else{
			out = out + inText.charAt(i);
			}
			i +=1;
		}
	fs.writeFile('decode.txt', out, function(error) {
		if (error) throw error;
	});
    console.log('Decoding finished!');
    fs.readFile('input.txt', function(error, data1){
	if (error) throw error;
	inText1 = data1.toString();
	console.log(data1);
	});
    fs.readFile('decode.txt', function(error, data2){
		if (error) throw error;
		inText2 = data2.toString();
		console.log(data2);
	if (inText1 == inText2){
		console.log('Decoding is right');
		}
	else{
		console.log('Decoding is wrong');
		}
	});
});