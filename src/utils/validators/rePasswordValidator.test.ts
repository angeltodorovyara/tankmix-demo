import rePasswordValidator from './rePasswordValidator'

test('should the two passwords match', () => {
    expect(rePasswordValidator('Angel1994', 'Angel1994')).toBe('')
})

test('should not the two passwords match', () => {
    expect(rePasswordValidator('Angel1994', 'Angel994 ')).toBe('validations.rePasswordError')
})