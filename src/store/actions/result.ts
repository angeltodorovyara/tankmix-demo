import { MixResult, Product } from "../../interfaces"
import * as actionTypes from './actionTypes';

declare let window: any
declare let cordova: any

export const mixResult = (email: string, selectedProducts: Product[]) => {
    return (dispatch: any) => {
        dispatch(mixResultStart())
        setTimeout(() => {
            window.db.transaction(function (tx: any) {
                const finalResult: MixResult = {
                    user_email: email,
                    f_product: selectedProducts[0].name,
                    s_product: selectedProducts[1].name,
                    datetime: (new Date()).toString()
                }
                tx.executeSql('INSERT INTO results VALUES(?1, ?2, ?3, ?4)', [finalResult.user_email, finalResult.f_product, finalResult.s_product, finalResult.datetime],
                    function (tx: any, rs: any) {
                        dispatch(mixResultSuccess(selectedProducts));
                        dispatch(addResultToUserResults(finalResult));
                        cordova.plugins.notification.local.schedule({
                            title: 'Your Mix Result is ready!',
                            text: 'Click to view it...',
                        });
                    },
                    function (tx: any, error: any) {
                        mixResultFailed('Something went wrong')
                        console.log("SELECT error: " + error.message);
                    }
                );
            });
        }, 1500);
    }
}

export const mixResultCleanUp = () => {
    return {
        type: actionTypes.MIX_RESULT_CLEANUP
    }
}

const mixResultSuccess = (mixData: Product[]) => {
    return {
        type: actionTypes.MIX_RESULT_SUCCESS,
        data: [...mixData]
    }
}

const mixResultStart = () => {
    return {
        type: actionTypes.MIX_RESULT_START
    }
}

const mixResultFailed = (err: string) => {
    return {
        type: actionTypes.MIX_RESULT_FAILED,
        err
    }
}

const addResultToUserResults = (data: MixResult) => {
    return {
        type: actionTypes.ADD_RESULT_TO_USER_RESULTS,
        data
    }
}