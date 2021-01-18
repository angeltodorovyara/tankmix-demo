import { MixResult, Product, User } from "../../interfaces"

export const AUTH_START = 'AUTH_START'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILED = 'AUTH_FAILED'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

interface AuthStartAction {
    type: typeof AUTH_START;
};

interface AuthLogOutAction {
    type: typeof AUTH_LOGOUT;
};

interface AuthSuccessAction {
    type: typeof AUTH_SUCCESS;
    data: User;
    dataResults: MixResult[];
};

interface AuthFailedAction {
    type: typeof AUTH_FAILED;
    err: string;
};

interface addResultToUserResultsAction {
    type: typeof ADD_RESULT_TO_USER_RESULTS;
    data: MixResult;
}

export type AuthActionTypes = AuthStartAction | AuthLogOutAction | AuthFailedAction | AuthSuccessAction | addResultToUserResultsAction

// Products

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
export const CREATE_PRODUCT_FAILED = 'CREATE_PRODUCT_FAILED'
export const CREATE_PRODUCT_CLEANUP = 'CREATE_PRODUCT_CLEANUP'

interface GetProductsSuccessAction {
    type: typeof GET_PRODUCTS_SUCCESS;
    data: Product[];
}

interface GetProductsFailedAction {
    type: typeof GET_PRODUCTS_FAILED;
    err: string;
}

interface CreateProductSuccess {
    type: typeof CREATE_PRODUCT_SUCCESS;
    data: Product;
}

interface CreateProductFailed {
    type: typeof CREATE_PRODUCT_FAILED;
    err: string;
}

interface CreateProductCleanup {
    type: typeof CREATE_PRODUCT_CLEANUP;
}

export type GetProductsActionTypes = GetProductsSuccessAction | GetProductsFailedAction | CreateProductFailed | CreateProductSuccess | CreateProductCleanup

// Result

export const MIX_RESULT_START = 'MIX_RESULT_START'
export const MIX_RESULT_SUCCESS = 'MIX_RESULT_SUCCESS'
export const MIX_RESULT_FAILED = 'MIX_RESULT_FAILED'
export const MIX_RESULT_CLEANUP = 'MIX_RESULT_CLEANUP'
export const ADD_RESULT_TO_USER_RESULTS = 'ADD_RESULT_TO_USER_RESULTS'

interface MixResultStartAction {
    type: typeof MIX_RESULT_START;
}

interface MixResultSuccessAction {
    type: typeof MIX_RESULT_SUCCESS;
    data: Product[];
}

interface MixResultFailedAction {
    type: typeof MIX_RESULT_FAILED
    err: string;
}

interface MixResultCleanupAction {
    type: typeof MIX_RESULT_CLEANUP;
}

export type MixResultActionTypes = MixResultStartAction | MixResultSuccessAction | MixResultFailedAction | MixResultCleanupAction

// Location API

export const GEOLOCATION_SUCCESS = 'GEOLOCATION_SUCCESS'
export const GEOLOCATION_FAILED = 'GEOLOCATION_FAILED'

interface GeolocationSuccessAction {
    type: typeof GEOLOCATION_SUCCESS;
    location: string;
    weather: string;
}

interface GeolocationFailedAction {
    type: typeof GEOLOCATION_FAILED;
}

export type GeolocationActionTypes = GeolocationSuccessAction | GeolocationFailedAction