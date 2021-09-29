let fs = require('fs');
let arg = process.argv;
let inText;
let out = '';
let i = 0, n = 1, b = 0;

console.log(arg);

fs.readFile('input.txt', function(error, data) {
	if (error) throw error;
	inText = data.toString();
	while (i < inText.length){
		while(inText.charAt(i) == inText.charAt(i+n)){
			n++;
		}
		while (n > 255){
			out = out + '#' + String.fromCharCode(255) + inText.charAt(i);
			n = n - 255;
			}
		if ((n > 3) || (inText.charAt(i) == '#')) {
			out = out +'#' + String.fromCharCode(n) + inText.charAt(i);
		}	
		else{
			n = 0;
			while(inText.charAt(i) == inText.charAt(i+n)){
			    n++;
				out = out + inText.charAt(i);
			}	
		}
		i += n;
		n  = 1;
	fs.writeFile('code.txt', out, function(error) {
		if (error) throw error;
	});
	}
console.log('Coding finised!');
});