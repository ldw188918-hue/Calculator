// Unit Converter tests
import { UnitConverter } from '../js/converter.js';

describe('UnitConverter', () => {
    let converter;

    beforeEach(() => {
        converter = new UnitConverter();
    });

    describe('Length conversions', () => {
        test('should convert meters to kilometers', () => {
            expect(converter.convert(1000, 'm', 'km', 'length')).toBeCloseTo(1);
        });

        test('should convert kilometers to meters', () => {
            expect(converter.convert(1, 'km', 'm', 'length')).toBe(1000);
        });

        test('should convert meters to centimeters', () => {
            expect(converter.convert(1, 'm', 'cm', 'length')).toBe(100);
        });

        test('should convert inches to centimeters', () => {
            expect(converter.convert(1, 'in', 'cm', 'length')).toBeCloseTo(2.54);
        });

        test('should convert feet to meters', () => {
            expect(converter.convert(1, 'ft', 'm', 'length')).toBeCloseTo(0.3048);
        });
    });

    describe('Weight conversions', () => {
        test('should convert kilograms to grams', () => {
            expect(converter.convert(1, 'kg', 'g', 'weight')).toBe(1000);
        });

        test('should convert pounds to kilograms', () => {
            expect(converter.convert(1, 'lb', 'kg', 'weight')).toBeCloseTo(0.4536);
        });

        test('should convert ounces to grams', () => {
            expect(converter.convert(1, 'oz', 'g', 'weight')).toBeCloseTo(28.35);
        });
    });

    describe('Temperature conversions', () => {
        test('should convert Celsius to Fahrenheit', () => {
            expect(converter.convert(0, 'C', 'F', 'temperature')).toBe(32);
            expect(converter.convert(100, 'C', 'F', 'temperature')).toBe(212);
        });

        test('should convert Fahrenheit to Celsius', () => {
            expect(converter.convert(32, 'F', 'C', 'temperature')).toBe(0);
            expect(converter.convert(212, 'F', 'C', 'temperature')).toBe(100);
        });

        test('should convert Celsius to Kelvin', () => {
            expect(converter.convert(0, 'C', 'K', 'temperature')).toBe(273.15);
        });

        test('should convert Kelvin to Celsius', () => {
            expect(converter.convert(273.15, 'K', 'C', 'temperature')).toBe(0);
        });
    });

    describe('Error handling', () => {
        test('should handle same unit conversion', () => {
            expect(converter.convert(100, 'm', 'm', 'length')).toBe(100);
        });

        test('should throw error for invalid category', () => {
            expect(() => converter.convert(100, 'm', 'km', 'invalid')).toThrow();
        });

        test('should throw error for invalid unit', () => {
            expect(() => converter.convert(100, 'invalid', 'km', 'length')).toThrow();
        });
    });

    describe('Getting available units', () => {
        test('should return available units for a category', () => {
            const lengthUnits = converter.getUnits('length');
            expect(lengthUnits).toContain('m');
            expect(lengthUnits).toContain('km');
            expect(lengthUnits).toContain('cm');
        });

        test('should return all categories', () => {
            const categories = converter.getCategories();
            expect(categories).toContain('length');
            expect(categories).toContain('weight');
            expect(categories).toContain('temperature');
        });
    });
});
