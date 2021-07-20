import { Iuser } from "../../ts/user"

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export const loginUser = (data: Iuser) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const logoutUser = () => {
    return { type: LOGOUT }
}