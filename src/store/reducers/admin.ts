import { GetAllUsersActionTypes, GET_ALL_USERS_SUCCESS } from "../actions/actionTypes"
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
        default:
            return state
    }
}

export default reducer