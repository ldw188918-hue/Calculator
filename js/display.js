// Display Management
export class Display {
    constructor() {
        this.resultElement = document.getElementById('result');
        this.expressionElement = document.getElementById('expression');
        this.updateScheduled = false;
    }

    update(state) {
        if (this.updateScheduled) return;

        this.updateScheduled = true;
        requestAnimationFrame(() => {
            this.resultElement.textContent = this.formatNumber(state.currentValue);
            this.expressionElement.textContent = state.expression || '';
            this.updateScheduled = false;
        });
    }

    formatNumber(value) {
        const num = parseFloat(value);

        // Handle very large or very small numbers
        if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }

        // Limit decimal places
        const str = String(value);
        if (str.length > 12) {
            return parseFloat(value).toPrecision(10);
        }

        return value;
    }

    showError(message) {
        this.resultElement.textContent = message;
        this.resultElement.classList.add('error');
        this.expressionElement.textContent = '';

        // Vibrate on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }

        setTimeout(() => {
            this.resultElement.classList.remove('error');
        }, 2000);
    }

    clear() {
        this.resultElement.textContent = '0';
        this.expressionElement.textContent = '';
        this.resultElement.classList.remove('error');
    }
}
