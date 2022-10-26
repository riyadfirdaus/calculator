let numberStr = '';
let operationStr = '';
let sum;
let isFirstNumber = true;
let operator;
let isFinished = true;
let digitPressed, equalPressed, operatorPressed;
let state = 'clear';

const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const operationDisplay = document.querySelector("#operationDisplay");
const resultDisplay = document.querySelector("#resultDisplay");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector('#equal');

clearBtn.addEventListener('click', clearCalc);
digits.forEach(digit =>{
    digit.addEventListener('click', append);
});
operators.forEach(operator =>{
    operator.addEventListener('click', assign);
})
equalBtn.addEventListener('click', equal);

function clearCalc(){
    operationStr = '';
    numberStr = '';
    sum = 0;
    operand = 0;
    operationDisplay.textContent = operationStr;
    resultDisplay.textContent = operationStr;
    state = 'clear';
}
function updateDisplay(str){
    operationDisplay.textContent = operationStr;
    resultDisplay.textContent = str;
}

function append(e){
    const value = e.target.textContent;
    console.log(operationStr);
    if(state == 'equal'){
        clearCalc();
    }
    
    numberStr += value;
    operationStr += value;
    
    operand = parseInt(numberStr);
    updateDisplay(operand);
    state = 'digit'
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
    if(state == 'operator'){
        operationStr = operationStr.slice(0,-3);
    }
    
    operator = (e.target.id);
    operationStr += ` ${e.target.textContent} `;
    numberStr = '';
    if((state == 'digit' || state == 'equal') && sum == undefined){
        sum = operand;
        updateDisplay(sum);
    }
    else if(state != 'operator'){
        sum = calculate(sum, operand, operator);
        updateDisplay(sum);
    }
    else{
        updateDisplay(sum);
    }
    state = 'operator';
}
function equal(){
    if(state != 'equal'){
        sum = calculate(sum, operand, operator);
        updateDisplay(sum);
    }
    operator = '';
    operationStr = sum;
    operand = sum;
    sum = undefined;
    state = 'equal';
}
