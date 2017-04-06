import { combineReducers } from 'redux'

const account = function (state = {}, action) {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
      return action.payload
    case 'SIGN_UP_ERROR':
      return {error: action.payload}
    case 'SIGN_IN_SUCCESS':
      return action.payload
    case 'SIGN_OUT':
      return {}
    case 'SIGN_IN_ERROR':
      return {error: action.payload}
    default:
      return state
  }
}

const signingIn = function (state = false, action) {
  switch (action.type) {
    case 'SIGN_IN_START':
      return true
    case 'SIGN_IN_SUCCESS':
      return false
    case 'SIGN_IN_ERROR':
      return false
    default:
      return state
  }
}

const signingUp = function (state = false, action) {
  switch (action.type) {
    case 'SIGN_UP_START':
      return true
    case 'SIGN_UP_SUCCESS':
      return false
    case 'SIGN_UP_ERROR':
      return false
    default:
      return state
  }
}

const error = function (state = {}, action) {
  switch (action.type) {
    case 'SIGN_UP_START':
    case 'SIGN_IN_START':
      return {}
    case 'SIGN_UP_ERROR':
      return action.payload
    case 'SIGN_IN_ERROR':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  account,
  signingIn,
  signingUp,
  error
})
