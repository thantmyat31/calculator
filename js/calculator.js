const btns = document.querySelectorAll('.btn');
const resultArea = document.querySelector('.result');
let hasDecimal = false;
let numbersString = '';
let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';
let lastStatus = '';

btns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if(e.target.classList.contains('btn-number')) {
            insertNumber(e.target.dataset.number);
        } 
        
        if(e.target.classList.contains('btn-operator')) {
            operation(e.target.dataset.operator);
        }

        if(e.target.classList.contains('btn-all-clear')) {
            clearAll();
        }

        if(e.target.classList.contains('btn-clear')) {
            if(lastStatus === 'operator') return clearAll();
            clear();
        }
    });
});

function insertNumber(dataNumber) {
    if(dataNumber === '.') {
        if(!hasDecimal) {
            numbersString += dataNumber;
            hasDecimal = true;
        } else {
            numbersString = numbersString;
        }
    } else {
        if(firstNumber && secondNumber && result && operator === '=') {
            firstNumber = '';
            secondNumber = '';
            result = '';
            operator = '';
        }
        numbersString += dataNumber;
    }
    showResultText(numbersString);
    lastStatus = 'number';
}

function showResultText(text) {
    resultArea.textContent = text;
}

function clearAll() {
    numbersString = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    showResultText('');
}

function clear() {
    numbersString = numbersString.slice(0, -1);
    showResultText(numbersString);
}

function operation(targetOperator) {
    if(!firstNumber && !secondNumber) {
        firstNumber = Number(numbersString);
    } else if(typeof firstNumber === 'number' && firstNumber !== '') {
        secondNumber = Number(numbersString);
    }

    if(operator.length) {
        if(operator === '+') result = firstNumber + secondNumber;
        if(operator === '-') result = firstNumber - secondNumber;
        if(operator === '*') result = firstNumber * secondNumber;
        if(operator === '/') result = firstNumber / secondNumber;
        if(operator === '%') result = firstNumber % secondNumber;
        firstNumber = result;
    } 
    numbersString = '';
    operator = targetOperator;
    hasDecimal = false;
    lastStatus = 'operator';
    
    if(result || result === 0) showResultText(Number.isInteger(result) ? result : Number(result).toFixed(2));
}

window.addEventListener('keypress', function(e) {
    const key = e.key;
    if(key.match(/[\d\.]/)) {
        insertNumber(key);
    }
    if(key.match(/[\+\-\*\/=%]/)) {
        operation(key);
    }
    if(key === 'Enter') {
        operation('=');
    }
    return;
});