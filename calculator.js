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
        console.log('clear')
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
    state.factors.push([operator, 'operator'])
}

function addDecimal(decimal) {
    state.factors.push([decimal, 'decimal'])
}

function evalulate() {
    
    state.factors = [[eval(toString()), 'number' ]]
}

function toString() {
    let string = '';
    state.factors.forEach(value => {
        let val = value[0] 
        string += val
    });
    return string;
}

function display() {
    displayValue.value = toString()
}



