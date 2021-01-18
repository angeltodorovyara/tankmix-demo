import { ProductsState } from '../types'
import { GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESS, GetProductsActionTypes, CREATE_PRODUCT_FAILED, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_CLEANUP } from '../actions/actionTypes'

const initialState: ProductsState = {
    data: null,
    isAddingDone: false,
    error: null
}

const reducer = (state = initialState, action: GetProductsActionTypes) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                data: [...action.data],
                error: null
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.err
            }
        case CREATE_PRODUCT_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                data: [...state.data!, action.data],
                isAddingDone: true,
                error: null
            }
        case CREATE_PRODUCT_FAILED:
            return {
                ...state,
                error: action.err
            }
        case CREATE_PRODUCT_CLEANUP:
            return {
                ...state,
                isAddingDone: false,
                error: null
            }
        default:
            return state
    }
}

export default reducer