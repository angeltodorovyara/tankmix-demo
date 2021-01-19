import { CLEAN_ADMIN_STATE, GetAllUsersActionTypes, GET_ALL_USERS_SUCCESS } from "../actions/actionTypes"
import { AdminState } from "../types"

const initialState: AdminState = {
    allUsers: [],
    allProducts: []
}

const reducer = (state = initialState, action: GetAllUsersActionTypes) => {
    switch (action.type) {
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                allUsers: [...action.data]
            }
        case CLEAN_ADMIN_STATE:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer