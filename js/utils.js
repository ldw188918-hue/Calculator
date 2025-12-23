// Utility Functions and Constants
export const CONSTANTS = {
    PI: Math.PI,
    E: Math.E
};

export class PrecisionHandler {
    static round(value, decimals = 10) {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    static formatDisplay(value, maxDigits = 12) {
        const str = String(value);
        return str.length > maxDigits ? str.substring(0, maxDigits) : str;
    }
}

export class ErrorHandler {
    static handle(error, display) {
        let message;

        if (error.message.includes('Division by zero')) {
            message = 'Error: ÷ by 0';
        } else if (error.message.includes('Math domain error')) {
            message = 'Error: Domain';
        } else if (error.message.includes('Number too large')) {
            message = 'Error: Too large';
        } else if (error.message.includes('Factorial')) {
            message = 'Error: Invalid !';
        } else {
            message = 'Error';
        }

        display.showError(message);

        // Log error for debugging
        console.error('[Calculator Error]', {
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
