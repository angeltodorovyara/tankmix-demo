import passwordValidator from './passwordValidator'

test('valid password - cap, small, number', () => {
    expect(passwordValidator("Angel1994")).toBe('');
});

test('valid password - small', () => {
    expect(passwordValidator("angel")).toBe('');
});

test('valid password - number', () => {
    expect(passwordValidator("14111994")).toBe('');
});

test('valid password - number cap', () => {
    expect(passwordValidator("AAA1994")).toBe('');
});

test('invalid password - too short - 1', () => {
    expect(passwordValidator("1994")).toBe('validations.shortPassword');
});

test('invalid password - too short - 2', () => {
    expect(passwordValidator("aa76")).toBe('validations.shortPassword');
});

test('invalid password - too short - 3', () => {
    expect(passwordValidator("54")).toBe('validations.shortPassword');
});

test('invalid password - too short - 4', () => {
    expect(passwordValidator("dsd")).toBe('validations.shortPassword');
});

test('invalid password - too long', () => {
    expect(passwordValidator("Angel1994Angel1994Angel1994Angel1994")).toBe('validations.longPasword');
});

test('invalid password - space beggining (no trim)', () => {
    expect(passwordValidator(" Angel1994")).toBe('validations.invalidPassword');
});

test('invalid password - space end (no trim)', () => {
    expect(passwordValidator("Angel1994 ")).toBe('validations.invalidPassword');
});

test('invalid password - invalid characters - .', () => {
    expect(passwordValidator("Angel1.994")).toBe('validations.invalidPassword');
});

test('invalid password - invalid characters - !', () => {
    expect(passwordValidator("Angel1!994")).toBe('validations.invalidPassword');
});