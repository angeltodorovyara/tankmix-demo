import { getAllProducts } from '.';
import { MixResult, User } from '../../interfaces';
import getUser from '../../utils/userFunction';
import * as actionTypes from './actionTypes';
import { adminStateCleanUp } from './admin';

declare let window: any

export const registerUser = (email: string, password: string) => {
    return (dispatch: any) => {
        const isAdmin: number = 0;
        const isDeactivated: number = 0;
        dispatch(authStart());
        email = email.trim().toLocaleLowerCase();
        window.db.transaction(function (tx: any) {
            tx.executeSql('INSERT INTO users VALUES(?1, ?2, ?3, ?4)', [email, password, isAdmin, isDeactivated], function (tx: any, rs: any) {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                dispatch(authSuccess({ email, password, isAdmin: Boolean(isAdmin), isDeactivated: Boolean(isDeactivated) }, []))
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
        email = email.trim().toLocaleLowerCase();
        window.db.transaction(function (tx: any) {
            tx.executeSql('SELECT * FROM users WHERE email = ?1 AND password = ?2 AND isDeactivated = ?3', [email, password, 0], function (tx: any, rs: any) {
                if (rs.rows.length === 1) {
                    const user = getUser({ ...rs.rows.item(0) })
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
                    dispatch(authFailed("wrongEmailPassword"))
                }
            }, function (tx: any, error: any) {
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const initialAuthCheckAndSetup = () => {
    return (dispatch: any) => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        dispatch(authStart())
        dispatch(getAllProducts())
        window.db.transaction(function (tx: any) {
            tx.executeSql('SELECT * FROM users WHERE email = ?1 AND password = ?2 AND isDeactivated = ?3', [email, password, 0], function (tx: any, rs: any) {
                if (rs.rows.length === 1) {
                    const user = getUser({ ...rs.rows.item(0) })
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
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const deactivateYourself = (email: string) => {
    return (dispatch: any) => {
        window.db.transaction(function (tx: any) {
            tx.executeSql('UPDATE users SET isDeactivated = ?1 WHERE email = ?2', [1, email], function (tx: any, rs: any) {
                dispatch(logout());
            }, function (tx: any, error: any) {
                console.log('SELECT error: ' + error.message)
            })
        })
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
    return (dispatch: any) => {
        dispatch(actionLogout())
        dispatch(adminStateCleanUp())
    }
}

const actionLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const cleanAuthError = () => {
    return {
        type: actionTypes.AUTH_ERROR_CLEAN
    }
}