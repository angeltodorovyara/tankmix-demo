import emailValidator from '../utils/validators/emailValidator'

test('valid email', () => {
    expect(emailValidator("we1000@abv.bg")).toBe('');
});

test('valid email dot', () => {
    expect(emailValidator("we.1000@abv.bg")).toBe('');
});

test('space before to test the trim method', () => {
    expect(emailValidator(" we1000@abv.bg")).toBe('');
});

test('space after to test the trim method', () => {
    expect(emailValidator("we1000@abv.bg ")).toBe('');
});

test('capital letters', () => {
    expect(emailValidator("We1000@abv.bG ")).toBe('');
});

test('invalid email - 1', () => {
    expect(emailValidator("we1000@abv")).toBe('validations.invalidEmail');
});

test('invalid email - 2', () => {
    expect(emailValidator("we1000abv.bg")).toBe('validations.invalidEmail');
});

test('invalid email - 3', () => {
    expect(emailValidator("we10 00abv.bg")).toBe('validations.invalidEmail');
});

test('invalid email - 4', () => {
    expect(emailValidator("we1000")).toBe('validations.invalidEmail');
});

test('empty email field', () => {
    expect(emailValidator("")).toBe('validations.empty');
});