import { ResultState } from '../types'
import { MIX_RESULT_FAILED, MIX_RESULT_START, MIX_RESULT_SUCCESS, MixResultActionTypes, MIX_RESULT_CLEANUP } from '../actions/actionTypes'

const initialState: ResultState = {
    data: [],
    loading: false,
    done: false,
    error: null
}

const reducer = (state = initialState, action: MixResultActionTypes) => {
    switch (action.type) {
        case MIX_RESULT_START:
            return {
                ...initialState,
                done: false,
                loading: true
            }
        case MIX_RESULT_SUCCESS:
            return {
                ...state,
                data: [...action.data],
                done: true,
                loading: false,
                error: null
            }
        case MIX_RESULT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.err
            }
        case MIX_RESULT_CLEANUP:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer