// Memory Management
export class Memory {
    constructor() {
        this.value = 0;
    }

    clear() {
        this.value = 0;
    }

    recall() {
        return this.value;
    }

    add(value) {
        this.value += parseFloat(value);
    }

    subtract(value) {
        this.value -= parseFloat(value);
    }

    hasValue() {
        return this.value !== 0;
    }
}
