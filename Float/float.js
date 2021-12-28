let result = '';
let arg = process.argv;
let fs = require('fs')
let input = fs.readFileSync(arg[2]).toString();
let string = input.split(' ');
console.log(string);
let order;
let orders = new Array();


function toFloat(number) {
    let sign = (number < 0) ? 1 : 0;
    number = Math.abs(number)
    let whole = Math.floor(number);
    let fractional;

    if (whole != number) {
        fractional = Number('0.' + String(number).split('.')[1]);
    } 
    else {
        fractional = 0;
    }
    console.log(fractional)

    let wholeBin = whole.toString(2);
    let lenwholeToStr = wholeBin.length;


    let fractionalBin = '';
    let flag = (lenwholeToStr > 0) ? true : false;
    if (fractional) {
        for (let i = 0; i < 24-lenwholeToStr; i++) {
            if (Math.floor(fractional*2) == 1) flag = true;
            if (flag == false) {
                i--;
                order--;
            }
            else {
                fractionalBin += Math.floor(fractional*2);
            }
            fractional = Number('0.' + String(fractional*2).split('.')[1]);
            if (isNaN(fractional)) break;
        }
    } else fractionalBin = '0'.repeat(24-lenwholeToStr)
    fractionalBin += '0'.repeat(24 - lenwholeToStr - fractionalBin.length)


    order = (lenwholeToStr > 0) ? lenwholeToStr - 1 : (-1);
    let orderBin = (order + 127).toString(2);
    orders.push(order);

    let float = sign;
    float += '0'.repeat(8 - orderBin.length) + orderBin;
    if (wholeBin > 0) {
        float += wholeBin.slice(1, wholeBin.length) + fractionalBin;
    } else {
        float += fractionalBin.slice(1, fractionalBin.length);
    }

    return float;
}


function floatToDec(orderBin) {
    let order = 0;
    let two = 1;
    for (let i = orderBin.length - 1; i >= 0; i--) {
        order += Number(orderBin[i]) * two;
        two *= 2;
    }
    return order -= 127;
}

function toDec(conversion) {
    let mantissaBin = conversion.slice(9, 32);
    let orderBin = conversion.slice(1, 9);
    let sign = conversion[0];
    let order = floatToDec(orderBin);
    let mantissa = 0;
    two = 0.5;
    for (let i = 0; i < mantissaBin.length; i++) {
        mantissa += Number(mantissaBin[i]) * two;
        two *= 0.5
    }

    let decimal = (1 + mantissa) * Math.pow(2, order) * Math.pow((-1), sign);
    return decimal;
}

function notEqual(first, second) {
    let difference = orders[0] - orders[1];
    second = first.slice(0,9) + '0'.repeat(difference - 1) + '1' + second.slice(9, 32 - difference);
    return second;
}

function addition(first, second) {
    let gain = 1;
    let sum = '';
    let trim = 30;
    if (first.slice(1,9) != second.slice(1,9)) {
        trim = 31;
        gain = 0;
        second = notEqual(first, second);
    }

    let dop = 0;
    for (let i = trim; i >= trim - 22; i--) {
        let amount = Number(first[i]) + Number(second[i]);
        sum = String((amount + dop) % 2) + sum;
        dop = Math.floor((amount + dop) / 2);
    }
    if (dop >= 1) {
        if (gain == 1);
        else sum = '0' + sum.slice(0, 23);
        gain++;
    }

    if (gain >= 1) {
        return first[0] + (floatToDec(first.slice(1, 9))+128).toString(2) + sum;
    }
    return first.slice(0,9) + sum;
}


function sub(first, second) {
    let gain = -1;
    let diff = '';
    if (first.slice(1,9) != second.slice(1,9)) {
        second = notEqual(first, second);
        flag = true;
        gain = 0;
    }

    let dop = 0;
    for (let i = 31; i >= 9; i--) {
        let amount = Number(first[i]) - Number(second[i]);
        diff = String((Math.abs(amount - dop)) % 2) + diff;
        dop = ((amount + dop) >= 0) ? 0 : -1;
    }

    if (gain == -1 || (gain == 0 && dop == -1)) {
        let i;
        for (i = 0; diff[i] == '0'; i++) {
            gain--;
        }
        if (dop == -1) {
            i++;
            gain--;
        }
        if (orders[0] == orders[1]) {
            i++;
        }
        diff = diff.slice(i, 31) + '0'.repeat(i);

    }
    let tempOrder = toBinWhole(floatToDec(first.slice(1, 9)) +  127 + gain);
    let sign = (string[0] > string[2]) ? '0' : '1';
    return sign + '0'.repeat(8 - tempOrder.length) + tempOrder + diff;
}


if(arg[3] == 'conv') {
    console.log(toFloat(string[0] * 1));
}

else if(arg[3] == 'calc') {
    if (string[1] == '-') {
        string[2] *= -1;
    }
    if (Math.abs(string[0]) < Math.abs(string[2])) {
        [string[0], string[2]] = [string[2], string[0]];
        if (string[2] > 0 && string[1] == '-') {
            string[1] = '+';
        }
    }
    let first = toFloat(Number(string[0]));
    let second = toFloat(Number(string[2]));
    let answer;
    if ((string[0][0] == string[1]) || (string[1] == '+' && string[0][0] != '-' && string[2][0] != '-')) {
        answer = addition(first, second);
        result += answer + '\n';
    } 
    else {
        answer = sub(first, second);
        result += answer + '\n';
    }
    result += String(toDec(answer));
    console.log(result);
}

// node float.js input.txt conv
