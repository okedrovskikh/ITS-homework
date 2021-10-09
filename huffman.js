let fs = require('fs');
let inText;
let alph = new Array();
let tree = new Array();
let j = 0;

function Node(letter, freq, used, father, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
}

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
	}
	
	for (i in tree){
		tree[tree[count].letter] = tree[count];
		count++;
	}
	console.log(tree);
	
	for(i = 0; i < inText.length; i++){
		out = out + tree[inText.charAt(i)].code;
	}
	console.log(out);
	fs.writeFile('output.txt', out, function(error) {
		if (error) throw error;
	});
});
});
