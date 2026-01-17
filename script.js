const inputField = document.getElementById('input');
const displayField = document.getElementById('display');
const resultField = document.getElementById('result');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');

// Calculate the expression when button is clicked
calculateBtn.addEventListener('click', calculateExpression);

// Calculate when Enter key is pressed
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        calculateExpression();
    }
});

// Clear the calculator
clearBtn.addEventListener('click', clearCalculator);

function calculateExpression() {
    const expression = inputField.value.trim();
    
    if (!expression) {
        resultField.textContent = '-';
        displayField.value = '';
        resultField.classList.remove('error');
        return;
    }
    
    try {
        // Display the expression
        displayField.value = expression;
        
        // Validate the expression to prevent malicious code
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }
        
        // Evaluate the expression
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Display the result
        resultField.textContent = result;
        resultField.classList.remove('error');
    } catch (error) {
        resultField.textContent = 'Error: ' + error.message;
        resultField.classList.add('error');
    }
}

function isValidExpression(expression) {
    // Allow only numbers, operators, and parentheses
    const validPattern = /^[\d+\-*/().\s]+$/;
    return validPattern.test(expression);
}

function clearCalculator() {
    inputField.value = '';
    displayField.value = '';
    resultField.textContent = '-';
    resultField.classList.remove('error');
    inputField.focus();
}
