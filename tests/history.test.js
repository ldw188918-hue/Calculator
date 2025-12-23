// History class tests
import { History } from '../js/history.js';

describe('History', () => {
    let history;

    beforeEach(() => {
        history = new History();
    });

    describe('Initialization', () => {
        test('should start with empty history', () => {
            expect(history.getAll()).toEqual([]);
        });

        test('should have max items limit', () => {
            expect(history.maxItems).toBe(20);
        });
    });

    describe('Adding items', () => {
        test('should add calculation to history', () => {
            history.add('2 + 3', '5');
            const items = history.getAll();

            expect(items).toHaveLength(1);
            expect(items[0]).toMatchObject({
                expression: '2 + 3',
                result: '5'
            });
            expect(items[0].timestamp).toBeDefined();
        });

        test('should add multiple calculations', () => {
            history.add('2 + 3', '5');
            history.add('10 - 4', '6');
            history.add('5 × 2', '10');

            expect(history.getAll()).toHaveLength(3);
        });

        test('should limit history to max items', () => {
            // Add 25 items (more than maxItems)
            for (let i = 0; i < 25; i++) {
                history.add(`${i} + 1`, `${i + 1}`);
            }

            expect(history.getAll()).toHaveLength(20);
        });

        test('should keep most recent items when limit exceeded', () => {
            for (let i = 0; i < 25; i++) {
                history.add(`${i} + 1`, `${i + 1}`);
            }

            const items = history.getAll();
            // Should have items 5-24 (most recent 20)
            expect(items[0].expression).toBe('5 + 1');
            expect(items[19].expression).toBe('24 + 1');
        });
    });

    describe('Clearing history', () => {
        test('should clear all history', () => {
            history.add('2 + 3', '5');
            history.add('10 - 4', '6');

            history.clear();

            expect(history.getAll()).toEqual([]);
        });
    });

    describe('Deleting specific item', () => {
        beforeEach(() => {
            history.add('2 + 3', '5');
            history.add('10 - 4', '6');
            history.add('5 × 2', '10');
        });

        test('should delete item by index', () => {
            history.delete(1);
            const items = history.getAll();

            expect(items).toHaveLength(2);
            expect(items[0].expression).toBe('2 + 3');
            expect(items[1].expression).toBe('5 × 2');
        });

        test('should handle invalid index gracefully', () => {
            history.delete(10);
            expect(history.getAll()).toHaveLength(3);
        });

        test('should handle negative index', () => {
            history.delete(-1);
            expect(history.getAll()).toHaveLength(3);
        });
    });

    describe('Getting history', () => {
        test('should return history in chronological order', () => {
            history.add('first', '1');
            history.add('second', '2');
            history.add('third', '3');

            const items = history.getAll();
            expect(items[0].expression).toBe('first');
            expect(items[2].expression).toBe('third');
        });
    });
});
