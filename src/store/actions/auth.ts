import { getAllProducts } from '.';
import { MixResult, User } from '../../interfaces';
import * as actionTypes from './actionTypes';
// import { getUserInformationSuccess } from './index'

declare let window: any

// loggin
export const registerUser = (email: string, password: string) => {
    return (dispatch: any) => {
        const isAdmin: number = 0;
        dispatch(authStart())
        window.db.transaction(function (tx: any) {
            tx.executeSql('INSERT INTO users VALUES(?1, ?2, ?3)', [email, password, isAdmin], function (tx: any, rs: any) {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                dispatch(authSuccess({ email, password, isAdmin }, []))
            }, function (tx: any, error: any) {
                dispatch(authFailed(error.message))
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const authenticate = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(authStart())

        window.db.transaction(function (tx: any) {
            tx.executeSql('SELECT * FROM users WHERE email = ?1 AND password = ?2', [email, password], function (tx: any, rs: any) {
                if (rs.rows.length === 1) {
                    const user = { ...rs.rows.item(0) }
                    localStorage.setItem('email', user.email)
                    localStorage.setItem('password', user.password)
                    window.db.transaction(function (tx: any) {
                        tx.executeSql('SELECT * FROM results WHERE user_email = ?1', [user.email], (tx: any, rs: any) => {
                            const results: MixResult[] = [];
                            for (let i = 0; i < rs.rows.length; i++) {
                                results.push(rs.rows.item(i))
                            }
                            dispatch(authSuccess(user, results))
                        })
                    })
                } else {
                    dispatch(logout())
                }
            }, function (tx: any, error: any) {
                dispatch(authFailed(error.message))
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const initialAuthCheckAndSetup = () => {
    return (dispatch: any) => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        setTimeout(() => {
            dispatch(authStart())
            dispatch(getAllProducts())
            window.db.transaction(function (tx: any) {
                tx.executeSql('SELECT * FROM users WHERE email = ?1 AND password = ?2', [email, password], function (tx: any, rs: any) {
                    if (rs.rows.length === 1) {
                        const user = { ...rs.rows.item(0) }
                        localStorage.setItem('email', user.email)
                        localStorage.setItem('password', user.password)
                        localStorage.setItem('isAdmin', user.isAdmin)
                        window.db.transaction(function (tx: any) {
                            tx.executeSql('SELECT * FROM results WHERE user_email = ?1', [user.email], (tx: any, rs: any) => {
                                const results: MixResult[] = [];
                                for (let i = 0; i < rs.rows.length; i++) {
                                    results.push(rs.rows.item(i))
                                }
                                dispatch(authSuccess(user, results))
                            })
                        })
                    } else {
                        dispatch(logout())
                    }
                }, function (tx: any, error: any) {
                    dispatch(authFailed(error.message))
                    console.log('SELECT error: ' + error.message)
                })
            })
        }, 2000);
    }
}

// ----------------------------------------

const authSuccess = (userData: User, results: MixResult[]) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: userData,
        dataResults: results
    }
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authFailed = (err: string) => {
    return {
        type: actionTypes.AUTH_FAILED,
        err
    }
}

// Logout

export const logout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('isAdmin')
    return (dispatch: any) => {
        dispatch(actionLogout())
    }
}

const actionLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}