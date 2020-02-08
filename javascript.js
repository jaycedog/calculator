
const wrapper = document.getElementById('container');
const display = document.getElementById('display');
let operation = [];
let clearCount = 0;


wrapper.addEventListener('click', (event) => {

    const isNumber = event.target.className === "number";
    const isOperator = event.target.className === "operator";
    const isArrayOperator = operation[operation.length - 1] === "+" || operation[operation.length - 1] === "-" || operation[operation.length - 1] === "/" || operation[operation.length - 1] === "*" || operation[operation.length - 1] === "^";
    const isPN = event.target.id === "pn";

    if (isNumber || isOperator) {

        if (event.target.id === "clear") {
            clearFunction();
            return;
        }

        if (event.target.id === "equal" && !isArrayOperator) {
            let answer = parsePostFix(postFix(operation));
            operation = [];
            operation[0] = answer;
            updateDisplay();
            return;
        }


        if ((operation.length === 0 && isOperator) || (isArrayOperator && isOperator)) {
            return;
        } else if (!isNaN(operation[operation.length - 1]) && isNumber) {

            operation[operation.length - 1] = operation[operation.length - 1] + event.target.innerHTML;


        } else if (isPN) {
            if (Math.sign(operation[operation.length - 1]) === 1) {
                operation[operation.length - 1] = "-" + operation[operation.length - 1];
            } else {
                operation[operation.length - 1] = operation[operation.length - 1].substr(1);
            }
        }


        else {


            if (event.target.id == "multiply") {
                operation.push("*")
            } else {


                operation.push(event.target.innerHTML)



            }
        }

        updateDisplay();
        clearCount = 0;

    }



})

function clearFunction() {

    if (clearCount === 0) {
        operation.pop();
        clearCount++;
    } else {
        operation = [];
    }

    updateDisplay();

}

function updateDisplay() {
    let string = operation.join(" ");
    let p = document.querySelector("#display p");
    p.innerHTML = string


}







function postFix(expression) {
    let expressionA = expression;

    let operatorStack = [];
    let output = [];

    for (let i = 0; i < expressionA.length; i++) {

        if (isNaN(expressionA[i])) {

            if ((operatorStack[operatorStack.length - 1] === '/' || operatorStack[operatorStack.length - 1] === '*' || operatorStack[operatorStack.length - 1] === "^") && (expressionA[i] === '+' || expressionA[i] === "-")) {

                output.push(operatorStack[operatorStack.length - 1]);
                operatorStack.pop();
                operatorStack.push(expressionA[i]);


            } else if ((operatorStack[operatorStack.length - 1] === '^') && (expressionA[i] === '*' || (expressionA[i] === '/') || (expressionA[i] === '-') || (expressionA[i] === '+'))) {


                output.push(operatorStack[operatorStack.length - 1]);
                operatorStack.pop();
                operatorStack.push(expressionA[i])


            } else {
                operatorStack.push(expressionA[i]);

            }


        } else {
            output.push(expressionA[i]);
        }


    }

    for (let i = operatorStack.length - 1; operatorStack.length >= 1; i--) {
        output.push(operatorStack[i]);
        operatorStack.pop();
    }

    return output;



}

function parsePostFix(equation) {

    let stack = [];


    for (let i = 0; i < equation.length; i++) {

        if (!isNaN(equation[i])) {
            stack.push(equation[i]);
        } else {
            let newNumber;

            if (equation[i] === equation[i + 1]) {
                newNumber = operate(equation[i], stack[0], stack[1]);
                stack.splice(0, 2)
                stack.unshift(newNumber);
            } else {
                newNumber = operate(equation[i], stack[stack.length - 2], stack[stack.length - 1]);
                stack.pop();
                stack.pop();
                stack.push(newNumber);
            }


        }





    }


    return stack[0];

}




function operate(operator, n1, n2) {

    if (operator === "+") {
        return parseInt(n1) + parseInt(n2);
    } else if (operator === "-") {
        return n1 - n2;
    } else if (operator === "*") {
        return n1 * n2;
    } else if (operator === "/") {
        return n1 / n2;
    } else {
        return Math.pow(n1, n2);
    }

}

