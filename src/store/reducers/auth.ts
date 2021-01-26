import { UserState } from '../types'
import { AuthActionTypes, AUTH_FAILED, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, ADD_RESULT_TO_USER_RESULTS, AUTH_ERROR_CLEAN } from '../actions/actionTypes'

const initialState: UserState = {
    data: null,
    isDone: false,
    results: [],
    error: null
}

const reducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...initialState
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                data: { ...action.data },
                results: [...action.dataResults],
                isDone: true,
                error: null
            }
        case AUTH_FAILED:
            return {
                ...state,
                isDone: true,
                error: action.err
            }
        case ADD_RESULT_TO_USER_RESULTS:
            return {
                ...state,
                results: [...state.results, action.data]
            }
        case AUTH_LOGOUT:
            return {
                ...initialState,
                isDone: true
            }
        case AUTH_ERROR_CLEAN:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default reducer