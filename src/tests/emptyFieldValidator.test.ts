import emptyFieldValidator from '../utils/validators/emptyFieldValidator'

test('should the field be emptry', () => {
    expect(emptyFieldValidator('')).toBe('validations.empty');
});

test('single space case', () => {
    expect(emptyFieldValidator(' ')).toBe('validations.empty');
});

test('the field is not empty', () => {
    expect(emptyFieldValidator('Product Name')).toBe('');
});

test('the field is not empty -trim end', () => {
    expect(emptyFieldValidator('Product Name ')).toBe('');
});

test('the field is not empty -trim beggining', () => {
    expect(emptyFieldValidator('Product Name ')).toBe('');
});