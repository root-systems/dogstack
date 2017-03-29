import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import LayoutReducer from '../layout/reducer'

export default combineReducers({
  routing: routerReducer
})
