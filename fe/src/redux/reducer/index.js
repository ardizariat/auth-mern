import { combineReducers } from 'redux'
import { homeReducer } from './HomeReducer'
import { globalReducer } from './GlobalReducer'

const reducer = combineReducers({
  homeReducer,
  globalReducer,
})

export default reducer
