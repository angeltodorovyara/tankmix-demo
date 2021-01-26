const emailValidator = (email: string): string => {
    const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    email = email.trim().toLowerCase();
    if (email === '') {
        return 'validations.empty'
    } else if (!regex.test(email)) {
        return 'validations.invalidEmail'
    } else {
        return ''
    }
}

export default emailValidator