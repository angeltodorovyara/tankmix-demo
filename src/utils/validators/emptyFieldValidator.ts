const emptyFieldValidator = (value: string): string => {
    if (value === '') {
        return 'validations.empty'
    } else {
        return ''
    }
}

export default emptyFieldValidator