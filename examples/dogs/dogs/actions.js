import { createAction } from 'redux-actions'

import client from '../client'
const dogsService = client.service('dogs')

// TODO: use feathers-action
// create
export const createDogStart = createAction('CREATE_DOG_START')
export const createDogSuccess = createAction('CREATE_DOG_SUCCESS')
export const createDogError = createAction('CREATE_DOG_ERROR')

export const createDog = (params) => (dispatch, getState) => {
  dispatch(createDogStart())
  return dogsService.create(params)
  .then((dog) => {
    dispatch(createDogSuccess(dog))
  })
  .catch(err => dispatch(createDogError(err)))
}

// find
export const findDogStart = createAction('FIND_DOG_START')
export const findDogSuccess = createAction('FIND_DOG_SUCCESS')
export const findDogError = createAction('FIND_DOG_ERROR')

export const findDog = (params) => (dispatch, getState) => {
  dispatch(findDogStart())
  return dogsService.find(params)
  .then((dog) => {
    dispatch(findDogSuccess(dog))
  })
  .catch(err => dispatch(findDogError(err)))
}

// update
export const updateDogStart = createAction('UPDATE_DOG_START')
export const updateDogSuccess = createAction('UPDATE_DOG_SUCCESS')
export const updateDogError = createAction('UPDATE_DOG_ERROR')

export const updateDog = (params) => (dispatch, getState) => {
  dispatch(updateDogStart())
  return dogsService.update(params.id, params)
  .then((dog) => {
    dispatch(updateDogSuccess(dog))
  })
  .catch(err => dispatch(updateDogError(err)))
}

// remove
export const removeDogStart = createAction('REMOVE_DOG_START')
export const removeDogSuccess = createAction('REMOVE_DOG_SUCCESS')
export const removeDogError = createAction('REMOVE_DOG_ERROR')

export const removeDog = (params) => (dispatch, getState) => {
  dispatch(removeDogStart())
  return dogsService.remove(params)
  .then((dog) => {
    dispatch(removeDogSuccess(dog))
  })
  .catch(err => dispatch(removeDogError(err)))
}
