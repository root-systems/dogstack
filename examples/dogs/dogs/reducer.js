import {combineReducers} from 'redux'
import assign from 'lodash/assign'
import omit from 'lodash/omit'

const dogs = function (state = {}, action) {
  switch (action.type) {
    case 'CREATE_DOG_SUCCESS':
      return assign({}, state, { [action.payload.id]: action.payload })
    case 'FIND_DOG_SUCCESS':
      return action.payload
    case 'REMOVE_DOG_SUCCESS':
      return omit(state, action.payload.id)
    default:
      return state
  }
}

// TODO: some module that handles the bool states of feathers, feathers-reducer?
const finding = function (state = false, action) {
  switch (action.type) {
    case 'FIND_DOG_START':
      return true
    case 'FIND_DOG_SUCCESS':
      return false
    default:
      return state
  }
}

const creating = function (state = false, action) {
  switch (action.type) {
    case 'CREATE_DOG_START':
      return true
    case 'CREATE_DOG_SUCCESS':
      return false
    default:
      return state
  }
}

const updating = function (state = false, action) {
  switch (action.type) {
    case 'UPDATE_DOG_START':
      return true
    case 'UPDATE_DOG_SUCCESS':
      return false
    default:
      return state
  }
}

const removing = function (state = false, action) {
  switch (action.type) {
    case 'REMOVE_DOG_START':
      return true
    case 'REMOVE_DOG_SUCCESS':
      return false
    default:
      return state
  }
}

const error = function (state = {}, action) {
  switch (action.type) {
    case 'FIND_DOG_START':
    case 'CREATE_DOG_START':
    case 'UPDATE_DOG_START':
    case 'REMOVE_DOG_START':
      return {}
    case 'FIND_DOG_ERROR':
    case 'CREATE_DOG_ERROR':
    case 'UPDATE_DOG_ERROR':
    case 'REMOVE_DOG_ERROR':
      return action.payload
    default:
      return state
  }
}
export default combineReducers({
  dogs,
  finding,
  creating,
  updating,
  removing,
  error
})
