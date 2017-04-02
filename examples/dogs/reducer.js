import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import dogsReducer from './dogs/reducer'

export default combineReducers({
  dogs: dogsReducer,
  routing: routerReducer
})
