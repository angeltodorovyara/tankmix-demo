const passwordValidator = (password: string): string => {
    const regex = new RegExp(/[a-zA-Z0-9]+/);
    password = password.trim();
    if (password === '') {
        return 'validations.empty';
    } else if (password.length < 5) {
        return 'validations.shortPassword';
    } else if (password.length > 16) {
        return 'validations.longPasword'
    } else if (!regex.test(password)) {
        return 'validations.invalidPassword'
    } else {
        return ''
    }
}

export default passwordValidator