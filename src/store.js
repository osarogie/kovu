import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducer from './reducers'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    autoRehydrate()
  )

  return createStore(reducer, initialState, enhancer)
}

export default function getStore() {
  const store = configureStore({})
  persistStore(store, { storage: AsyncStorage })

  return store
}
