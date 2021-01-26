import * as actionTypes from './actionTypes'
import { Product } from "../../interfaces"

declare let window: any

export const createProduct = (name: string, description: string, imageURL: string | null) => {
    return (dispatch: any) => {
        name = name.trim();
        description = description.trim();
        const product: Product = { name, description, imageURL }
        window.db.transaction(function (tx: any) {
            tx.executeSql('INSERT INTO products VALUES(?1, ?2, ?3)', [name, description, imageURL], function (tx: any, rs: any) {
                dispatch(createProductSuccess(product))
            }, function (tx: any, error: any) {
                dispatch(createProductFailed(error.message))
                console.log('SELECT error: ' + error.message)
            })
        })
    }
}

export const getAllProducts = () => {
    return (dispatch: any) => {
        window.db.transaction(function (tx: any) {
            tx.executeSql("SELECT * FROM products", [], function (tx: any, rs: any) {
                const resultArray: Product[] = [];
                for (let i = 0; i < rs.rows.length; i++) {
                    resultArray.push({ ...rs.rows.item(i) });
                }
                dispatch(getAllProductsSuccess(resultArray))
            },
                function (tx: any, error: any) {
                    dispatch(getAllProductsFailed('Something went wrong'))
                    console.log("SELECT error: " + error.message);
                }
            );
        });
    }
}

const getAllProductsSuccess = (userData: Product[]) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        data: [...userData]
    }
}

const getAllProductsFailed = (err: string) => {
    return {
        type: actionTypes.GET_PRODUCTS_FAILED,
        err
    }
}

const createProductSuccess = (data: Product) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        data
    }
}

const createProductFailed = (err: string) => {
    return {
        type: actionTypes.CREATE_PRODUCT_FAILED,
        err
    }
}

export const createProductCleanup = () => {
    return {
        type: actionTypes.CREATE_PRODUCT_CLEANUP
    }
}