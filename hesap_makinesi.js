const display=document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');


var displayValue = '0';
var firstValue = null;
var operator = null;
var waitForSecondValue = false;


updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener('click' , function(e){
    const element = e.target;

    if(!element.matches('button')|| element.value === '') return;  //sadece bu butona tıklayınca tepki versin diye oluşturduk
    
    const value = element.value;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);    
    }
    updateDisplay();
});

    function handleOperator(nextOperator){
        const value = parseFloat(displayValue);
        if(operator && waitForSecondValue){
            operator = nextOperator;
            displayValue = '0';
            return;
        }

        if(firstValue === null){
            firstValue = value;
        }else if (operator){
            const result = calculate(firstValue,value, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitForSecondValue = true ;
        operator = nextOperator;

        console.log(displayValue, firstValue, operator, waitForSecondValue);

    }

    function calculate(first,second,operator){
       if(operator === '+'){
            return first + second ;
       }else if (operator === '-'){
            return first - second ;
       }else if (operator === '*'){
        return first * second ;
       }else if (operator === '/'){
        if (second === 0) return "HATA: Sıfıra Bölünemez";
        return first / second;
       }
       return second;
    }


    function inputNumber(num){
        if(waitForSecondValue){
            displayValue = num;
            waitForSecondValue = false ;

        }else{
        displayValue = displayValue === '0' ?num: displayValue +num ;
    }
    console.log(displayValue, firstValue, operator, waitForSecondValue);

}   
    function inputDecimal(){
        if(!displayValue.includes('.')){
         displayValue +='.' ;

        }
    }
    function clear(){
        displayValue ='0';
    }
    