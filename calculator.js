var state = {
    factors: [
        [ '0', 'number' ] 
    ],
    evalulated: false
}

const buttons = document.querySelector('.buttons');
const displayValue = document.querySelector('.displayView');

buttons.addEventListener('click', btnClick)

function btnClick(event) {
    const target = event.target;

    if(target.classList[1] === 'number') {
        addNumbers(target.value)
    }
    
    if(target.classList[1] === 'operator') {
        addOperator(target.value)
    }

    if(target.classList[1] === 'equals') {
        evalulate()
    }

    if(target.classList[1] === 'clear') {
        clearDisplay()
    }

    if(target.classList[1] === 'decimal'){
        addDecimal(target.value)
    }
    console.log(state)
    display()
}

function addNumbers(number) {
    state.factors.push([number, 'number'])
}

function addOperator(operator){
    if(state.factors[state.factors.length -1][1] === 'operator') return;
    state.factors.push([operator, 'operator'])
}

function addDecimal(decimal) {
    if(state.factors[state.factors.length -1][1] === 'decimal') return;
    state.factors.push([decimal, 'decimal'])
}

function evalulate() {
    state.factors = [[eval(toString()), 'number' ]]    
    state.evaluated = true
}

function toString() {
    let string = '';
    state.factors.forEach(value => {
        let val = value[0] 
        string += val
    });
    return string;
}

function clearDisplay(){
    state.factors = [[ '0', 'number' ]]
    state.evaluated = false
}

function display() {
    displayValue.value = toString()
}



