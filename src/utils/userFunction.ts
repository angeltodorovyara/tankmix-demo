import { User } from "../interfaces";

const getUser = (obj: User): User => {
    const user: User = { ...obj }
    user.isAdmin = Boolean(user.isAdmin)
    user.isDeactivated = Boolean(user.isDeactivated)
    localStorage.setItem('email', user.email)
    localStorage.setItem('password', user.password)
    return user;
}

export default getUser;