import { Geolocation } from '../types'
import { GEOLOCATION_FAILED, GEOLOCATION_SUCCESS, GeolocationActionTypes } from '../actions/actionTypes'

const initialState: Geolocation = {
    location: null,
    weather: null
}

const reducer = (state = initialState, action: GeolocationActionTypes) => {
    switch (action.type) {
        case GEOLOCATION_SUCCESS:
            return {
                ...state,
                location: action.location,
                weather: action.weather
            }
        case GEOLOCATION_FAILED:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default reducer