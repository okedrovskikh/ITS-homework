let readlineSync = require('readline-sync');
let fs = require('fs');
let arg = process.argv;
let prog, count = 0, j = 0, a = 0;
let ram = new Array();

fs.readFile(arg[2], function(error, data){
	if (error) throw error;
	prog = data.toString();
	//console.log(prog);
	ram = prog.split(/\s+/);
	for (i in ram){
		count++;
	}
	while (j < count){
		//console.log(ram[j]);
		if(ram[j] == 'set'){
			ram[ram[j + 1]] = ram[j + 2] * 1;
			j += 2;
		}
		else if (ram[j] == 'input'){
			ram[ram[j + 1]] = readlineSync.question('');
			j++;
		}
		else if (ram[j] == 'put'){
			ram[ram[j + 1]] = ram[ram[j + 2] * 1];
			j +=2; 
		}
		else if (ram[j] == 'add'){
			ram[ram[j + 3]] = ram[ram[j + 1] * 1] + ram[ram[j + 2] * 1];
			j += 3;			
		}
		else if (ram[j] == 'mult'){
			ram[ram[j + 3]] = ram[ram[j + 1] * 1] * ram[ram[j + 2] * 1];
			j += 3;
		}
		else if (ram[j] == 'sub'){
			ram[ram[j + 3]] = ram[ram[j + 1] * 1] - ram[ram[j + 2] * 1];
			j += 3;
		}
		else if (ram[j] == 'div'){
			ram[ram[j + 3]] = ram[ram[j + 1] * 1] / ram[ram[j + 2] * 1];
			j += 3;
		}
		else if (ram[j] == 'div%'){
			ram[ram[j + 3]] = ram[ram[j + 1] * 1] % ram[ram[j + 2] * 1];
			j += 3;
		}
		else if (ram[j] == 'while'){
			j++;
			if(ram[j] == 'more'){
				if (ram[ram[j + 1] * 1] >= ram[ram[j + 2] * 1]){
					j += 2;
			    }
			    else{
					while(ram[j] != 'whileend'){
						j++;
				    }
			    }
			}
			else if (ram[j] == 'notequal'){
				if (ram[ram[j + 1] * 1] != ram[ram[j + 2] * 1]){
					j += 2;
			    }
			    else{
					while(ram[j] != 'whileend'){
						j++;
				    }
			    }
			}
			else if (ram[j] == 'less'){
				if (ram[ram[j + 1] * 1] <= ram[ram[j + 2] * 1]){
					j += 2;
			    }
			    else{
					while(ram[j] != 'whileend'){
						j++;
				    }
			    }
			}	    
		}
		else if(ram[j] == 'output'){
			j++;
			console.log(ram[ram[j]]);
		}
		else{
			console.log('error');
			break;
		}
		j++;
		if(ram[j] == 'whileend'){
			while (ram[j] != 'while'){
				j--;
			}
			//console.log(ram[j]);
		}
	}
});
//node j##.js