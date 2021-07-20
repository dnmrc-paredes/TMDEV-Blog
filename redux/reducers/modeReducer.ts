import { AnyAction } from "redux";

export const modeReducer = (state = 'LIGHT', action: AnyAction) => {

    switch(action.type) {
        case 'LIGHT':
            return state = 'LIGHT'
        case 'DARK':
            return state = 'DARK'
        default:
            return state
    }

}