// Sample test to verify Jest setup
describe('Test Environment', () => {
    test('Jest is working correctly', () => {
        expect(true).toBe(true);
    });

    test('Basic math operations work', () => {
        expect(2 + 2).toBe(4);
        expect(5 - 3).toBe(2);
        expect(3 * 4).toBe(12);
        expect(10 / 2).toBe(5);
    });
});
