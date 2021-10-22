let fs = require('fs');
let inText, tmp1, tmp2, min;
let code = ''; out = '';
let alph = new Array();
let tree = new Array();
let letter = new Array();
let count = 0;
let j = 0;

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
	
	if (j > 1){
		while(tree[tree.length - 1].freq < inText.length){
			min = inText.length;
			for (i in tree){
				if(tree[i].used == false && tree[i].freq <= min){
                    tmp1 = i;
					min = tree[i].freq;
				}
			}
			tree[tmp1].used = true;
			min = inText.length;
			for (i in tree){
				if(tree[i].used == false && tree[i].freq <= min){
                    tmp2 = i;
					min = tree[i].freq;
			    }
		    }
			tree[tmp2].used = true;
			n = new Node(tree[tmp1].letter + tree[tmp2].letter, tree[tmp1].freq + tree[tmp2].freq, false, null, '');
			tree.push(n);
			tree[tmp1].father = n;
			tree[tmp2].father = n;
			if (tree[tmp1].letter.length > 1){
				tree[tmp1].code='1';
				tree[tmp2].code='0';
			}
			else{
				tree[tmp1].code='0';
				tree[tmp2].code='1';
			}
	    } 
	}
	else if (j == 1){
		tree[0].used = true;
		tree[0].code = '0';
	}
	for (i = tree.length - 2; i >= 0; i--){
		tree[i].code = tree[i].father.code + tree[i].code;
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


	inText = out;
	out = '';
	for (let k = 0; k < inText.length; k++){
		code += inText.charAt(k);
		for(i in letter){
			if(code == letter[i].code){
				out += letter[i].letter;
				code = '';
			}
		}
	}
	console.log(out);
});
// node huff.js