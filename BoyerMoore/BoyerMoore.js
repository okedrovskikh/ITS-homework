let arg = process.argv;
let s = arg[2].toString(); 
let t = arg[3].toString(); 
let m = t.length;
let n = s.length;

let shift1 = new Array();
for (let i = 0; i < m - 1; i++){
    shift1[t.charAt(i)] = i + 1;
}
console.log(shift1);

let shift2 = new Array();
let rpr = new Array();
shift2[0]=1;
rpr[0]=m;
for (let i = 1; i <= m - 1; i++) {
    for (let k = m - i - 1; k >= 2 - i - 1; k--) {
        let f = 0;
        if (k >= 0) {
            k1 = m - i;
            for (let j = k; j <= k + i - 1; j++) {
                if (t[j] == t[k1]) {
                    k1++;
                } 
                else {
                    f = 1
                    break
                }
            }
        }
        if (k <= 0) {
            k1 = m - i - k
            h = k1
            for (let j = 0; j < m - k1; j++) {
                if (t[j] == t[h]) {
                    h++;
                } 
                else {
                    f = 1;
                    break
                }
            }
        }
        if (k <= m - i && f == 0 && ((k >= 1 && t[k - 1] != t[m - i - 1]) || k < 1)) {
            rpr[i] = k + 1;
            break;
        }
        if (f == 1 && k <= m - i) {
            rpr[i] = 1 - i;
        }
    }
    shift2[i] = m - rpr[i] - i + 1;
}
console.log(shift2);

let result = new Array();
let k = 0;
while (k <= n - m){
    let count = 0, length = 0;
    for (let i = k + m - 1; i >= k; i--){
        count++;
        if (s[i] == t[m - count]){
            length++;
        }
        else{
            if (m - shift1[s.charAt(i)] > shift2[length]){
                k += m - shift1[s.charAt(i)];
            }
            else{
                k += shift2[length];
            }
            break;
        }
        if (length == m){
            result.push(k);
            k += Math.max(m - shift1[s.charAt(i)], shift2[length - 1]);
        }
    }
}

console.log(result);

// node BoyerMoore.js abccabcbbccabcdabcdabc abcdabc