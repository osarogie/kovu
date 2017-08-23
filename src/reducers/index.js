import { combineReducers } from 'redux'
import user from './user'
import night_mode from './night_mode'

export default combineReducers({
  user,
  night_mode
})
