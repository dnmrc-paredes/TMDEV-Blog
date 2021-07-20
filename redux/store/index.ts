import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import { root } from '../reducers/rootReducer'

const persistConfig = {
    key: 'tmdev',
    storage
}

const persistedReducer = persistReducer(persistConfig, root)
const composeEnhancers = composeWithDevTools()

export const store = createStore(persistedReducer, composeEnhancers)
export const persistor = persistStore(store)