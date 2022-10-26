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
    operand = 0;
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
    operand = parseInt(numberStr);
    updateDisplay(operand);
    isFinished = false;
}

function calculate(sum, operand, operator){
    switch(operator){
        case 'divide':
            if(operand === 0){
                return 'error';
            }
            return sum*1.0 / operand;
            break;
        case 'multiply':
            return sum * operand;
            break;
        case 'plus':
            return sum + operand;
            break;
        case 'minus':
            return sum - operand;
            break;
    }
}
function assign(e){
    operationStr += ` ${e.target.textContent} `;
    numberStr = '';
    if(isFirstNumber){
        sum = operand;
        isFirstNumber = false;
        updateDisplay('');
    }
    else{
        sum = calculate(sum, operand, operator);
        updateDisplay(sum);
    }
    operator = (e.target.id);
    isFinished=false;
}
function equal(){
    if(isFinished == false){
        sum = calculate(sum, operand, operator);
        updateDisplay(sum);
    }
    operator = '';
    operationStr = sum;
    isFinished = true;
    isFirstNumber = true;
    operand = sum;
}
console.log('text');
