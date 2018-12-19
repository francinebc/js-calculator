var state = {
    factors: [
        [ '0', 'number' ] 
    ],
    evaluated: false,
    init: false
}

// Globals
const buttons = document.querySelector('.buttons');
const displayValue = document.querySelector('.displayView');
const maxLength = 9;

buttons.addEventListener('click', btnClick)

function btnClick(event) {
    const target = event.target;
    
    if(target.classList[1] === 'number') {
        addNumbers(target.value)
        state.evaluated = false;
    }
    if(target.classList[1] === 'decimal'){
        addDecimal(target.value)
        state.evaluated = false;
    }  
    
    if(state.init){
    
        if(target.classList[1] === 'operator') {
            addOperator(target.value)
            state.evaluated = false;
        }
        if(target.classList[1] === 'equals') {
            evalulate()
        }

        if(target.classList[1] === 'clear') {
            clearDisplay()
            state.evaluated = false;
        }
    }

    if(state.factors.length>maxLength){state.factors.pop()}
    display()
}

function addNumbers(number) {
    if(state.evaluated || !state.init){ 
        state.factors = [[number, 'number']]
        state.init = true
        return
    }
    if(state.factors[0][0] === '0' && state.factors.length === 1 && number === '0') return
    state.factors.push([number, 'number'])
}

function addOperator(operator){
    if(state.factors[state.factors.length -1][1] === 'operator') return
    state.factors.push([operator, 'operator'])
}

function addDecimal(decimal) {
    state.init = true
    if(state.evaluated){ 
        state.factors = [['0', 'number'], [decimal, 'decimal']]
        return;
    }
    if(state.factors[state.factors.length -1][1] === 'decimal') return
    state.factors.push([decimal, 'decimal'])
}

function evalulate() {
    if(state.factors[state.factors.length -1][1] === 'operator') return
    let arr = toCleanArray()
    state.factors = [[calculate(arr), 'number' ]]    
    state.evaluated = true
}

function toString() {
    let string = ''
    for(let i = 0; i < state.factors.length; i++) {
        string += state.factors[i][0]
    }
    return string;
}

function toCleanArray(){
    const { factors } = state
    let arr = factors[0][0]
    for(let i = 1; i < factors.length; i++) {
        if(!jointNumbers(factors[i][1], factors[i-1][1])) arr += ' ';
        arr += factors[i][0];
    }
    arr = arr.split(" ")
    return arr;
}

/**
 * This function takes two params and returns true if they are both numbers or decimals
 */
function jointNumbers(a, b){
    return (a==='number' || a==='decimal') && (b==='number' || b==='decimal')
}

function clearDisplay(){
    state.factors = [[ '0', 'number' ]]
    state.init = false
}

function display() {
    displayValue.value = toString()
}

function calculate(arr) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === 'x' || arr[i] === '/'){
            arr.splice(i - 1, 3, performOp(arr[i - 1], arr[i + 1], arr[i]))
            i--
        }
    }
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === '+' || arr[i] === '-'){
            arr.splice(i - 1, 3, performOp(arr[i - 1], arr[i + 1], arr[i]))
            i--
        }
    }

    return arr.join("").trim()
}

function performOp(a, b, op){
    a = Number(a)
    b = Number(b)
    if (op === 'x') return a*b
    if (op === '/') return a/b
    if (op === '-') return a-b
    if (op === '+') return a+b
}