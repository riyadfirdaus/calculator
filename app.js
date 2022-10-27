let numberStr = '', operationStr = '';
let sum, operator, operand = 0;
let state = 'clear';

const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const operationDisplay = document.querySelector("#operationDisplay");
const resultDisplay = document.querySelector("#resultDisplay");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");


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
        console.log(sum + operand);
        return sum + operand;
        break;
        case 'minus':
        return sum - operand;
        break;
    }
}
function clearCalc(){
    operationStr = '';
    numberStr = '';
    sum = undefined;
    operand = 0;
    operationDisplay.textContent = operationStr;
    resultDisplay.textContent = operationStr;
    state = 'clear';
}
function updateDisplay(str){
    if(str === undefined) return;
    if(str.toString().length>9){
        number = new Intl.NumberFormat("en-US", {notation: "scientific"}).format(parseInt(str));
    }
    else 
    number = new Intl.NumberFormat("en-US").format(parseInt(str));
    operationDisplay.textContent = operationStr;
    resultDisplay.textContent = number;
}

function append(e){
    const value = e.target.textContent;
    if(state == 'equal'){
        clearCalc();
    }
    if(operand == 0){
        operationStr = operationStr.slice(0,-1);
    }
    numberStr += value;
    operationStr += value;
    
    operand = parseInt(numberStr);
    updateDisplay(operand);
    state = 'digit'
}

function assign(e){
    if(state == 'clear') return;
    if(state == 'operator'){
        operationStr = operationStr.slice(0,-3);
    }
    operator = (e.target.id);
    operationStr += ` ${e.target.textContent} `;
    numberStr = '';
    
    if((state == 'digit' || state == 'equal') && sum == undefined){
        sum = operand;
    }
    else if(state != 'operator' && state != 'equal'){
        sum = calculate(sum, operand, operator);
    }
    updateDisplay(sum);
    state = 'operator';
}
function equal(){
    if(state != 'equal'){
        sum = calculate(sum, operand, operator);
        updateDisplay(sum);
    }
    operator = '';
    operationStr = `${sum}`;
    operand = sum;
    console.log(sum);
    state = 'equal';
}

clearBtn.addEventListener('click', clearCalc);
digits.forEach(digit =>{
    digit.addEventListener('click', append);
});
operators.forEach(operator =>{
    operator.addEventListener('click', assign);
})
equalBtn.addEventListener('click', equal);

window.addEventListener('keydown', (e) =>{
    let selector;
    console.log(e.key);
    switch(e.key){
        case '-':
            selector = '#minus';
            break;
        case '+':
            selector = '#plus';
            break;
        case '/':
            selector = '#divide';
            break;
        case '*':
            selector = '#multiply';
            break;
        case 'Enter':
            selector = '#equal';
            break;
        default:
            selector = `#digit-${e.key}`;
            break;
        
    }
    const button = document.querySelector(`${selector}`);
    if(button!= null)
        button.click();
});