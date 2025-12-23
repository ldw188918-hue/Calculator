/**
 * Unit Converter class for various unit conversions
 * Supports length, weight, and temperature conversions
 */
export class UnitConverter {
    constructor() {
        // Define conversion factors to base units
        this.conversions = {
            length: {
                base: 'm', // meters as base
                units: {
                    m: 1,
                    km: 0.001,
                    cm: 100,
                    mm: 1000,
                    in: 39.3701,
                    ft: 3.28084,
                    yd: 1.09361,
                    mi: 0.000621371
                }
            },
            weight: {
                base: 'kg', // kilograms as base
                units: {
                    kg: 1,
                    g: 1000,
                    mg: 1000000,
                    lb: 2.20462,
                    oz: 35.274
                }
            },
            temperature: {
                // Temperature needs special handling (not linear)
                special: true
            }
        };
    }

    /**
     * Convert between units
     * @param {number} value - Value to convert
     * @param {string} from - Source unit
     * @param {string} to - Target unit
     * @param {string} category - Category (length, weight, temperature)
     * @returns {number} Converted value
     */
    convert(value, from, to, category) {
        // Same unit, return as is
        if (from === to) {
            return value;
        }

        // Validate category
        if (!this.conversions[category]) {
            throw new Error(`Invalid category: ${category}`);
        }

        // Special handling for temperature
        if (category === 'temperature') {
            return this.convertTemperature(value, from, to);
        }

        const categoryData = this.conversions[category];

        // Validate units
        if (!categoryData.units[from] || !categoryData.units[to]) {
            throw new Error(`Invalid unit for category ${category}`);
        }

        // Convert to base unit, then to target unit
        const baseValue = value / categoryData.units[from];
        const result = baseValue * categoryData.units[to];

        return Number(result.toFixed(10)); // Round to avoid floating point errors
    }

    /**
     * Convert temperature units
     * @param {number} value - Temperature value
     * @param {string} from - Source unit (C, F, K)
     * @param {string} to - Target unit (C, F, K)
     * @returns {number} Converted temperature
     */
    convertTemperature(value, from, to) {
        // First convert to Celsius
        let celsius;
        switch (from) {
            case 'C':
                celsius = value;
                break;
            case 'F':
                celsius = (value - 32) * 5 / 9;
                break;
            case 'K':
                celsius = value - 273.15;
                break;
            default:
                throw new Error(`Invalid temperature unit: ${from}`);
        }

        // Then convert from Celsius to target
        let result;
        switch (to) {
            case 'C':
                result = celsius;
                break;
            case 'F':
                result = celsius * 9 / 5 + 32;
                break;
            case 'K':
                result = celsius + 273.15;
                break;
            default:
                throw new Error(`Invalid temperature unit: ${to}`);
        }

        return Number(result.toFixed(2));
    }

    /**
     * Get available units for a category
     * @param {string} category - Category name
     * @returns {Array} Array of unit abbreviations
     */
    getUnits(category) {
        if (category === 'temperature') {
            return ['C', 'F', 'K'];
        }

        const categoryData = this.conversions[category];
        return categoryData ? Object.keys(categoryData.units) : [];
    }

    /**
     * Get all available categories
     * @returns {Array} Array of category names
     */
    getCategories() {
        return Object.keys(this.conversions);
    }

    /**
     * Get unit display name
     * @param {string} unit - Unit abbreviation
     * @returns {string} Display name
     */
    getUnitName(unit) {
        const names = {
            // Length
            m: 'meter',
            km: 'kilometer',
            cm: 'centimeter',
            mm: 'millimeter',
            in: 'inch',
            ft: 'foot',
            yd: 'yard',
            mi: 'mile',
            // Weight
            kg: 'kilogram',
            g: 'gram',
            mg: 'milligram',
            lb: 'pound',
            oz: 'ounce',
            // Temperature
            C: 'Celsius',
            F: 'Fahrenheit',
            K: 'Kelvin'
        };

        return names[unit] || unit;
    }
}
