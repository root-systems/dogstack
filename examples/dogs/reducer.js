import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import dogsReducer from './dogs/reducer'
import accountReducer from './account/reducer'

export default combineReducers({
  dogs: dogsReducer,
  routing: routerReducer,
  account: accountReducer
})
