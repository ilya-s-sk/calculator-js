const input = document.querySelector('.input'),
      output = document.querySelector('.output');

const buttons = document.querySelectorAll('.btn'),
      btnPlus = document.querySelector('.btn-plus'),
      btnMinus = document.querySelector('.btn-minus'),
      btnCross = document.querySelector('.btn-cross'),
      btnDivision = document.querySelector('.btn-division'),
      btnEqual = document.querySelector('.btn-equal'),
      btnClear = document.querySelector('.btn-clear');

const btnNumbers = document.querySelectorAll('.btn-number');

btnNumbers.forEach((item, index) => {
    item.addEventListener('click', () => {
        input.value += index;
    })
})


const calc = {
    a: null,
    b: null,
    action: null,
    result: null
}

const actions = {
    addition: {
        action() {return this.a + this.b},
        sign: '+'
    },
    subtraction: {
        action () {
            return this.a - this.b
        },
        sign: '-'
    },
    multiplication: {
        action () {
            return this.a * this.b
        },
        sign: '×'
    },
    division: {
        action () {
            return this.a / this.b
        },
        sign: '÷'
    },
}

const getOutput = (num, sign) => ` ${num} ${sign} `;
const getBracketOutput = (prev, num, sign) => `(${prev} ${num} ) ${sign} `;
const getEqualityOutput = (num, result) => ` ${num} = ${result}`;


const clearAndFocus = (input) => {
    input.value = '';
    input.focus();
}

const clearObj = (obj) => {
    for (let key in obj) {
        obj[key] = null
    }
}

const calculate = (actionObj) => {

    const {action, sign} = actionObj;
    let value = +input.value;

    value = +input.value;
    
    if (!input.value) {

        if (!calc.result && !calc.a){
            output.textContent = "Enter your number";

            clearAndFocus(input);
            
        }  else if (calc.result) {
            calc.a = calc.result;
            calc.action = action;

            output.textContent = getOutput(calc.a, sign);
    
            clearAndFocus(input);
    
        } else if (calc.a) {
            calc.action = action;

            output.textContent = getOutput(calc.a, sign);

            clearAndFocus(input);
        }
         
    
    } else if ( input.value ) {
        
        if (!calc.a) {
            calc.a = +input.value;
            calc.action = action;
            
            output.textContent = getOutput(calc.a, sign);

            clearAndFocus(input);

        } else if (calc.a && !calc.b) {
            calc.b = +input.value;
            calc.result = calc.action();
            calc.action = action;

            sign === "×" || sign === "÷"
            ? output.textContent = getBracketOutput(output.textContent, calc.b, sign)
            : output.textContent += getOutput(calc.b, sign);

            clearAndFocus(input);

        } else if (calc.a && calc.b) {
            calc.a = calc.result;
            calc.b = +input.value;
            calc.action = action;
            calc.result = calc.action();

            sign === "×" || sign === "÷"
            ? output.textContent = getBracketOutput(output.textContent, calc.b, sign)
            : output.textContent += getOutput(calc.b, sign);

            clearAndFocus(input);

        }   
    }
}

btnPlus.addEventListener('click', () => {
    calculate(actions.addition)
});

btnMinus.addEventListener('click', () => {
    calculate(actions.subtraction)
});

btnCross.addEventListener('click', () => {
    calculate(actions.multiplication)
});

btnDivision.addEventListener('click', () => {
    calculate(actions.division)
});


btnEqual.addEventListener('click', () => {

    if(!calc.a) {
        clearAndFocus(input);
    } else if (!input.value) {

        if (!calc.result) {
            calc.b = 0;
            calc.result = calc.action();
            output.textContent += getEqualityOutput(calc.b, calc.result);

            clearAndFocus(input);
    
        } else if (calc.result) {
            calc.a = calc.result;
            calc.b = 0;
            calc.result = calc.action();
    
            output.textContent += getEqualityOutput(calc.b, calc.result);
    
            clearAndFocus(input);
        } 

    } else if (input.value) {
        if (!calc.b) {
            calc.b = +input.value;
            calc.result = calc.action();

            output.textContent += getEqualityOutput(calc.b, calc.result);

            clearAndFocus(input);
        } else {
            calc.a = calc.result;
            calc.b = +input.value;
            calc.result = calc.action();

            output.textContent += getEqualityOutput(calc.b, calc.result);

            clearAndFocus(input);
        }
        
    }

    for (let key in calc) {
        if (key !== 'result') {
            calc[key] = null;
        }
    }
});

btnClear.addEventListener('click', () => {
    output.textContent = '0';

    clearAndFocus(input);
    
    clearObj(calc);
});
