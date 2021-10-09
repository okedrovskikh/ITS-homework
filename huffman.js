let fs = require('fs');
let inText;
let tmp;
let code = '';
let out = '';
let alph = new Array();
let tree = new Array();
let letter = new Array();
let j = 0;
let k = 0;
let count = 0;

function Node(letter, freq, used, father, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
}

fs.readFile('input.txt', function(error, data){
	if (error) throw error;
	inText = data.toString();
	for (i = 0; i < inText.length; i++){
		alph[inText.charAt(i)] = 0;
	}
	for (i = 0; i < inText.length; i++){
		alph[inText.charAt(i)]++;
	}
	
	for (i in alph){
		let n = new Node (i, alph[i], false, null, '');
	    tree.push(n);
		j++;
	}
	
	tree.sort(function (a, b){
		if (a.freq > b.freq){
			return -1;
		}
		else if (a.freq < b.freq){
			return 1;
		}
		else{
			return 0;
		}
	});
	
	if (j > 1){
		let t = j;
		tmp = j;
		while (tree[0].used == false){
			n = new Node(tree[t - 2].letter + tree[j - 1].letter, tree[t - 2].freq + tree[j - 1].freq, false, null,'');
			tree[t - 2].used = true;
			tree[j - 1].used = true;
			tree.push(n);
			tree[t - 2].father = tree[j];
			tree[j - 1].father = tree[j];
			tree[t - 2].code = '0';
			tree[j - 1].code = '1';
			t--;
			j++;
		}
		while(j > 2){
			tree[j - 2].code = tree[j - 2].father.code + tree[j - 2].code
			j--;
		}
	}
	else if (j == 1){
		tree[0].used = true;
		tree[0].code = '0';
		tmp = 1;
	}
	console.log(tree);
	
	for (i in alph){
		letter[tree[count].letter] = tree[count];
		count++;
	}
	console.log(letter);
	
	for(i = 0; i < inText.length; i++){
		out = out + letter[inText.charAt(i)].code;
	}
	console.log(out);
	
	fs.writeFile('output.txt', out, function(error) {
		if (error) throw error;
	});
});

fs.readFile('output.txt', function(error, data){
	if (error) throw error;
	inText = data.toString();
	out = '';
	while (k < inText.length){
		if(inText.charAt(k) == '1'){
			code = code + '1';
		}
		else{
			code = code + '0';
			for (i in letter){
				if (letter[i].code == code){
					out = out + letter[i].letter;
					code = '';
				}
			}
		}
		if(code == tree[tmp - 1].code){
			out = out + tree[tmp - 1].letter;
			code = '';
		}
		k++;
	}
	console.log(out);
});
