const infixToPostfix = expression => {
    const output = [];
    const operatorStack = [];
    const operators = '*/+-';
    const count = expression.length;
    const precendence = {
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };
    
    for (let i = 0; i < count; i += 1) {
        const token = expression[i];
      
        if (operators.includes(token)) {
            if (precendence[operatorStack[operatorStack.length - 1]] > precendence[token]) {
                while (operatorStack.length) {
                    output.push(operatorStack.pop());
                }
            }
            operatorStack.push(token);
        } else {
            output.push(token);
        }
    }
    
    while (operatorStack.length) {
        output.push(operatorStack.pop());
    }
    
    return output;
};

const evaluatePostfixExpression = expression => {
    const stack = [];
    const count = expression.length;
    const operators = '*/+-';
    
    let result = 0;
    
    const op = {
        '+': (l, r) => +l + +r,
        '-': (l, r) => +l - +r,
        '*': (l, r) => +l * +r,
        '/': (l, r) => +l / +r
    };
    
    for (let i = 0; i < count; i += 1) {
        const token = expression[i];
        
        if (operators.includes(token)) {
            if (stack.length >= 2) {
                const right = stack.pop();
                const left = stack.pop();
                const r = op[token](left, right);
                stack.push(r);
            } else {
                throw new Error('Invalid Expression');
            }
        } else {
            stack.push(token);
        }
    }
    
    if (stack.length === 1) {
        result = stack.pop();
    } else {
        throw new Error('Invalid Expression');
    }
    
    return result;
};

const evaluateInfixExpression = expression => {
    const postfixExpression = infixToPostfix(expression);
    return evaluatePostfixExpression(postfixExpression);
};

export default evaluateInfixExpression
// 3 + 2 * 4 - 8 / 4 = 9
//evaluateInfixExpression([ '3', '+', '2', '*', '4', '-', '8', '/', '4' ]);

// evaluateInfixExpression(binaryExpressionToDecimalExpression(['11011', '+', '1000']));

