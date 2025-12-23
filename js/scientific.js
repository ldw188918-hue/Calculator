// Scientific Functions
export class ScientificFunctions {
    // Trigonometric functions (input in degrees, convert to radians)
    sin(x) {
        const radians = (x * Math.PI) / 180;
        return Math.sin(radians);
    }

    cos(x) {
        const radians = (x * Math.PI) / 180;
        return Math.cos(radians);
    }

    tan(x) {
        const radians = (x * Math.PI) / 180;
        return Math.tan(radians);
    }

    // Logarithmic functions
    ln(x) {
        if (x <= 0) throw new Error('Math domain error');
        return Math.log(x);
    }

    log(x) {
        if (x <= 0) throw new Error('Math domain error');
        return Math.log10(x);
    }

    // Root and power functions
    sqrt(x) {
        if (x < 0) throw new Error('Math domain error');
        return Math.sqrt(x);
    }

    square(x) {
        return Math.pow(x, 2);
    }

    cube(x) {
        return Math.pow(x, 3);
    }

    power(x, y) {
        return Math.pow(x, y);
    }

    // Exponential functions
    exp(x) {
        if (x > 700) throw new Error('Number too large');
        return Math.exp(x);
    }

    pow10(x) {
        if (x > 300) throw new Error('Number too large');
        return Math.pow(10, x);
    }

    // Factorial
    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) {
            throw new Error('Factorial requires non-negative integer');
        }
        if (n > 170) throw new Error('Number too large');
        if (n === 0 || n === 1) return 1;

        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}
