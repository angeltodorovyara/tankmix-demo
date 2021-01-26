const rePasswordValidator = (password: string, rePassword: string): string => {
    if (rePassword !== password) {
        return 'validations.rePasswordError';
    } else {
        return '';
    }
}

export default rePasswordValidator