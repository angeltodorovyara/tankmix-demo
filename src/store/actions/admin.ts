import * as actionTypes from './actionTypes'
import { User } from "../../interfaces";

declare let window: any;

export const getAllUsers = () => {
    return (dispatch: any) => {
        window.db.transaction(function (tx: any) {
            tx.executeSql('SELECT * FROM users', [], function (tx: any, rs: any) {
                const resultArray: User[] = [];
                for (let i = 0; i < rs.rows.length; i++) {
                    const user: User = { ...rs.rows.item(i) }
                    user.isAdmin = Boolean(user.isAdmin)
                    resultArray.push({ ...user });
                }
                dispatch(getAllUsersSuccess(resultArray));
            }, function (tx: any, error: any) {
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const updateUser = (email: string, checked: boolean) => {
    return (dispatch: any) => {
        const check = checked === true ? 1 : 0;
        window.db.transaction(function (tx: any) {
            tx.executeSql('UPDATE users SET isAdmin = ?1 WHERE email = ?2', [check, email], function (tx: any, rs: any) {
                dispatch(getAllUsers());
            }, function (tx: any, error: any) {
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

const getAllUsersSuccess = (data: User[]) => {
    return {
        type: actionTypes.GET_ALL_USERS_SUCCESS,
        data
    }
}