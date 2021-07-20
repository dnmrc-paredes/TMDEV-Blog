import { combineReducers } from 'redux'
import { modeReducer } from './modeReducer'
import { userReducer } from './userReducer'

import { Istate } from '../../ts/state'

export const root = combineReducers<Istate>({
    auth: userReducer,
    mode: modeReducer
})