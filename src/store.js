import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))

  return createStore(persistedReducer, initialState, enhancer)
}

export default function getStore() {
  const store = configureStore({})
  persistStore(store)

  return store
}
