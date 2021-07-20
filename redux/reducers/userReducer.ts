import { AnyAction } from "redux"
import { LOGIN_SUCCESS, LOGOUT } from "../actions/action"

export const userReducer = (state = {}, action: AnyAction) => {

    switch(action.type) {
        case LOGIN_SUCCESS:
            return state = action.payload
        case LOGOUT:
            return state = {}
        default:
            return state
    }

}