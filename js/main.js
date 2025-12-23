// Main Application Entry Point
import { Calculator } from './calculator.js';
import { ScientificFunctions } from './scientific.js';
import { Memory } from './memory.js';
import { Display } from './display.js';
import { History } from './history.js';
import { CONSTANTS, ErrorHandler } from './utils.js';

class CalculatorApp {
    constructor() {
        this.calculator = new Calculator();
        this.scientific = new ScientificFunctions();
        this.memory = new Memory();
        this.display = new Display();
        this.history = new History();

        this.setupEventListeners();
        this.setupHistoryUI();
    }

    setupEventListeners() {
        // Button click events
        document.querySelector('.buttons').addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (!button) return;

            this.handleButtonClick(button);
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        // Animate button
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 150);

        try {
            if (value) {
                this.handleValue(value);
            } else if (action) {
                this.handleAction(action);
            }

            this.display.update(this.calculator.getState());
        } catch (error) {
            ErrorHandler.handle(error, this.display);
            this.calculator.clear();
        }
    }

    handleValue(value) {
        if (value === 'π') {
            this.calculator.currentValue = String(CONSTANTS.PI);
            this.calculator.waitingForOperand = false;
        } else if (value === 'e') {
            this.calculator.currentValue = String(CONSTANTS.E);
            this.calculator.waitingForOperand = false;
        } else if (value === '.') {
            this.calculator.inputDecimal();
        } else {
            this.calculator.inputNumber(value);
        }
    }

    handleAction(action) {
        const current = parseFloat(this.calculator.currentValue);

        switch (action) {
            case 'AC':
                this.calculator.clear();
                this.display.clear();
                break;

            case 'DEL':
                this.calculator.delete();
                break;

            case '+':
            case '-':
            case '×':
            case '÷':
            case '%':
            case '=':
                const prevValue = this.calculator.currentValue;
                const prevOperator = this.calculator.operator;
                const prevPrevValue = this.calculator.previousValue;

                this.calculator.performOperation(action);

                // Save to history when calculation completes
                if (action === '=' && prevOperator && prevPrevValue !== null) {
                    const expression = `${prevPrevValue} ${prevOperator} ${prevValue}`;
                    const result = this.calculator.currentValue;
                    this.history.add(expression, result);
                    this.updateHistoryUI();
                }
                break;

            // Scientific functions
            case 'sin':
                this.calculator.currentValue = String(this.scientific.sin(current));
                break;

            case 'cos':
                this.calculator.currentValue = String(this.scientific.cos(current));
                break;

            case 'tan':
                this.calculator.currentValue = String(this.scientific.tan(current));
                break;

            case 'ln':
                this.calculator.currentValue = String(this.scientific.ln(current));
                break;

            case 'log':
                this.calculator.currentValue = String(this.scientific.log(current));
                break;

            case 'sqrt':
                this.calculator.currentValue = String(this.scientific.sqrt(current));
                break;

            case 'square':
                this.calculator.currentValue = String(this.scientific.square(current));
                break;

            case 'cube':
                this.calculator.currentValue = String(this.scientific.cube(current));
                break;

            case 'exp':
                this.calculator.currentValue = String(this.scientific.exp(current));
                break;

            case 'pow10':
                this.calculator.currentValue = String(this.scientific.pow10(current));
                break;

            case 'factorial':
                this.calculator.currentValue = String(this.scientific.factorial(current));
                break;

            // Memory functions
            case 'MC':
                this.memory.clear();
                break;

            case 'MR':
                this.calculator.currentValue = String(this.memory.recall());
                break;

            case 'M+':
                this.memory.add(this.calculator.currentValue);
                break;

            case 'M-':
                this.memory.subtract(this.calculator.currentValue);
                break;

            // Parentheses (basic support)
            case '(':
            case ')':
                // TODO: Implement expression parsing for parentheses
                break;

            // Power function (requires two operands)
            case 'power':
                this.calculator.performOperation('^');
                break;
        }
    }

    handleKeyPress(e) {
        const key = e.key;

        // Prevent default for calculator keys
        if (/^[0-9+\-*/.=]$/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
            e.preventDefault();
        }

        try {
            if (/^[0-9]$/.test(key)) {
                this.calculator.inputNumber(key);
            } else if (key === '.') {
                this.calculator.inputDecimal();
            } else if (key === '+') {
                this.calculator.performOperation('+');
            } else if (key === '-') {
                this.calculator.performOperation('-');
            } else if (key === '*') {
                this.calculator.performOperation('×');
            } else if (key === '/') {
                this.calculator.performOperation('÷');
            } else if (key === 'Enter' || key === '=') {
                this.calculator.performOperation('=');
            } else if (key === 'Escape') {
                this.calculator.clear();
                this.display.clear();
            } else if (key === 'Backspace') {
                this.calculator.delete();
            }

            this.display.update(this.calculator.getState());
        } catch (error) {
            ErrorHandler.handle(error, this.display);
            this.calculator.clear();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
});
```
