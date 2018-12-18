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
    console.log(state)
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
    let equa = toString(true)
    let evaled = eval(equa)
    state.factors = [[evaled, 'number' ]]    
    state.evaluated = true
}

function toString(mathmatical) {
    let string = '';
    state.factors.forEach(value => {
        let val = value[0] 
        if(val==='*' && !mathmatical) val='x';
        string += val
    });
    return string;
}

function clearDisplay(){
    state.factors = [[ '0', 'number' ]]
    state.init = false
}

function display() {
    displayValue.value = toString(false)
}



