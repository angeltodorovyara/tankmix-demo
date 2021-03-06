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
                    user.isDeactivated = Boolean(user.isDeactivated)
                    resultArray.push({ ...user });
                }
                dispatch(getAllUsersSuccess(resultArray));
            }, function (tx: any, error: any) {
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const updateUser = (email: string, isAdminT: boolean, isDeactivatedT: boolean) => {
    return (dispatch: any) => {
        const isAdmin = isAdminT === true ? 1 : 0;
        const isDeactivated = isDeactivatedT === true ? 1 : 0;
        window.db.transaction(function (tx: any) {
            tx.executeSql('UPDATE users SET isAdmin = ?1, isDeactivated = ?2 WHERE email = ?3', [isAdmin, isDeactivated, email], function (tx: any, rs: any) {
                dispatch(getAllUsers());
            }, function (tx: any, error: any) {
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const adminStateCleanUp = () => {
    return {
        type: actionTypes.CLEAN_ADMIN_STATE
    }
}

const getAllUsersSuccess = (data: User[]) => {
    return {
        type: actionTypes.GET_ALL_USERS_SUCCESS,
        data
    }
}