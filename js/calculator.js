// Calculator Core Logic
export class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.expression = '';
    }

    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentValue = String(num);
            this.waitingForOperand = false;
        } else {
            this.currentValue = this.currentValue === '0' ? String(num) : this.currentValue + num;
        }
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentValue = '0.';
            this.waitingForOperand = false;
        } else if (this.currentValue.indexOf('.') === -1) {
            this.currentValue += '.';
        }
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.expression = '';
    }

    delete() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
    }

    performOperation(nextOperator) {
        const inputValue = parseFloat(this.currentValue);

        if (this.previousValue === null) {
            this.previousValue = inputValue;
        } else if (this.operator) {
            const result = this.calculate(this.operator, this.previousValue, inputValue);
            this.currentValue = String(result);
            this.previousValue = result;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;

        if (nextOperator !== '=') {
            this.expression = `${this.previousValue} ${nextOperator}`;
        } else {
            this.expression = '';
            this.operator = null;
            this.previousValue = null;
        }
    }

    calculate(operator, a, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                if (b === 0) throw new Error('Division by zero');
                return a / b;
            case '%':
                return a % b;
            default:
                return b;
        }
    }

    getState() {
        return {
            currentValue: this.currentValue,
            expression: this.expression
        };
    }
}
