/**
 * History class for managing calculation history
 * Stores up to maxItems calculations with timestamps
 */
export class History {
    constructor(maxItems = 20) {
        this.items = [];
        this.maxItems = maxItems;
    }

    /**
     * Add a calculation to history
     * @param {string} expression - The calculation expression
     * @param {string} result - The result of the calculation
     */
    add(expression, result) {
        const item = {
            expression,
            result,
            timestamp: new Date().toISOString()
        };

        this.items.push(item);

        // Limit to maxItems
        if (this.items.length > this.maxItems) {
            this.items.shift(); // Remove oldest item
        }
    }

    /**
     * Get all history items
     * @returns {Array} Array of history items
     */
    getAll() {
        return [...this.items]; // Return copy to prevent direct modification
    }

    /**
     * Clear all history
     */
    clear() {
        this.items = [];
    }

    /**
     * Delete a specific item by index
     * @param {number} index - Index of item to delete
     */
    delete(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    /**
     * Get the count of items in history
     * @returns {number} Number of items
     */
    count() {
        return this.items.length;
    }
}
