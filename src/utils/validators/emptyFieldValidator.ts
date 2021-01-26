const emptyFieldValidator = (value: string): string => {
    value = value.trim();
    if (value === '') {
        return 'validations.empty';
    } else {
        return '';
    }
}

export default emptyFieldValidator;