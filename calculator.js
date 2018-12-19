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
    //let evaled = eval(equa)
    state.factors = [[calculate(equa), 'number' ]]    
    state.evaluated = true
}

function toString(mathmatical) {
    let string = ''
    for(let i = 0; i < state.factors.length; i++) {
        let val = state.factors[i]
        if(i>0){
            let lastVal = state.factors[i-1]
            if(mathmatical && !((val[1]==='number' || val[1]==='decimal') && 
            (lastVal[1]==='number' || lastVal[1]==='decimal'))){
                console.log('ssss')
                string += ' '
            }
        }
        string += val[0];
    }
    return string;
}

function clearDisplay(){
    state.factors = [[ '0', 'number' ]]
    state.init = false
}

function display() {
    displayValue.value = toString(false)
}

function calculate(math) {
    console.log(math)
    //debugger;
    let arr = math.split(" ")
    let result = 0;
    for(let i = 0;i < arr.length; i++) {
        if(arr[i] === 'x') {
            result = Number(arr[i - 1]) * Number(arr[i + 1])
            arr.splice(i - 1, 3, result)
            i--
        }
        if(arr[i] === '/') {
            result = Number(arr[i - 1]) / Number(arr[i + 1])
            arr.splice(i - 1, 3, result)
            i--
        }
    }
    for(let i = 0;i < arr.length; i++) {
        if(arr[i] === '+') {
            result = Number(arr[i - 1]) + Number(arr[i + 1])
            arr.splice(i - 1, 3, result)
            i--
        }
        if(arr[i] === '-') {
            result = Number(arr[i - 1]) - Number(arr[i + 1])
            arr.splice(i - 1, 3, result)
            i--
        }
    }
    return arr.join("").trim()
}
