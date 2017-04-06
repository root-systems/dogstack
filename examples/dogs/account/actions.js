import { createAction } from 'redux-actions'
import { browserHistory } from 'react-router'

export const signInSuccess = createAction('SIGN_IN_SUCCESS')
export const signOut = createAction('SIGN_OUT')
export const signInError = createAction('SIGN_IN_ERROR')
export const signInStart = createAction('SIGN_IN_START')
export const signIn = ({email, password}) => (dispatch, getState, api) => {
  dispatch(signInStart())
  api.authenticate({
    type: 'local',
    email,
    password
  }).then((account) => {
    dispatch(signInSuccess(account))
    browserHistory.push('/reviews')
  })
  .catch(err => dispatch(signInError(err)))
}
export const signInWithToken = (token) => (dispatch, getState, api) => {
  dispatch(signInStart())
  api.authenticate({
    type: 'token',
    token
  }).then((account) => {
    dispatch(signInSuccess(account))
    browserHistory.push('/reviews')
  })
  .catch(err => dispatch(signInError(err)))
}

export const signUpSuccess = createAction('SIGN_UP_SUCCESS')
export const signUpError = createAction('SIGN_UP_ERROR')
export const signUpStart = createAction('SIGN_UP_START')
export const signUp = ({email, password}) => (dispatch, getState, api) => {
  dispatch(signUpStart())
  var accounts = api.service('accounts')
  accounts.create({email, password})
    .then((account) => {
      dispatch(signUpSuccess(account))
    })
    .catch(err => dispatch(signUpError(err)))
}
