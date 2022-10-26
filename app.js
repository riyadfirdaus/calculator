let numberStr = '';
let operationStr = '';
let sum = 0;
let isFirstNumber = true;
let operator;
let isFinished = true;

const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const operationDisplay = document.querySelector("#operationDisplay");
const resultDisplay = document.querySelector("#resultDisplay");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector('#equal');

clearBtn.addEventListener('click', clearDisplay);
digits.forEach(digit =>{
    digit.addEventListener('click', append);
});
operators.forEach(operator =>{
    operator.addEventListener('click', assign);
})
equalBtn.addEventListener('click', equal);

function clearDisplay(){
    isFinished = false;
    operationStr = '';
    numberStr = '';
    sum = 0;
    number = 0;
    operationDisplay.textContent = operationStr;
    resultDisplay.textContent = operationStr;
    isFirstNumber = true;
}
function updateDisplay(str){
    operationDisplay.textContent = operationStr;
    resultDisplay.textContent = str;
}

function append(e){
    if(isFinished){
        clearDisplay();
    }
    numberStr += e.target.textContent;
    operationStr += e.target.textContent;
    number = parseInt(numberStr);
    updateDisplay(number);
    isFinished = false;
}

function calculate(sum, number, operator){
    switch(operator){
        case 'divide':
            if(number === 0){
                updateDisplay('error');
            }
            return sum*1.0 / number;
            break;
        case 'multiply':
            return sum*number;
            break;
        case 'plus':
            return sum + number;
            break;
        case 'minus':
            return sum - number;
            break;
    }
}
function assign(e){
    operationStr += ` ${e.target.textContent} `;
    numberStr = '';
    if(isFirstNumber){
        sum = number;
        isFirstNumber = false;
        updateDisplay('');
    }
    else{
        sum = calculate(sum, number, operator);
        updateDisplay('');
    }
    operator = (e.target.id);
    isFinished=false;
}
function equal(){
    sum = calculate(sum, number, operator);
    updateDisplay(sum);
    operationStr = sum;
    isFinished = true;
    isFirstNumber = true;
    number = sum;
    console.log(number);
}
console.log('text');
