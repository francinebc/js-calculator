const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', btnClick)

function btnClick(event) {
    const target = event.target;

    if(target.classList[1] === 'number') {
        console.log('is number')
    }
    
    if(target.classList[1] === 'operator') {
        console.log('operator')
    }

    if(target.classList[1] === 'equals') {
        console.log('equals')
    }

    if(target.classList[1] === 'clear') {
        console.log('clear')
    }

    if(target.classList[1] === 'decimal') console.log('decimal')
}

