import test from 'tape'
import freeze from 'deep-freeze'
import reducer from '../reducer'
import {
  signInSuccess,
  signOut,
  signInError,
  signInStart,
  signIn,
  signUpSuccess,
  signUpError,
  signUpStart,
  signUp
} from '../actions'

test('SIGN_UP_START', function (t) {
  const initialState = {}
  freeze(initialState)
  const newState = reducer(initialState, signUpStart())
  t.deepEqual(newState.account, initialState)
  t.true(newState.signingUp)
  t.end()
})

test('SIGN_UP_SUCCESS', function (t) {
  const initialState = {}
  freeze(initialState)
  const newAccount = {name: 'test', email: 'derp@dog.com', id: 1}
  const newState = reducer(initialState, signUpSuccess(newAccount))
  t.deepEqual(newState.account, newAccount)
  t.false(newState.signingUp)
  t.end()
})

test('SIGN_UP_ERROR', function (t) {
  const initialState = {}
  const error = 'bang!'
  freeze(initialState)
  const newState = reducer(initialState, signUpError(error))
  t.equal(newState.error, error)
  t.end()
})

test('signUp dispatches SIGN_UP_START action', function (t) {
  function dispatch (action) {
    t.equal(action.type, 'SIGN_UP_START')
    t.end()
  }
  const thunk = signUp({email: 'kjkj', password: 'fjdf'})
  const api = {
    service: () => {
      return {
        create: (creds) => new Promise(() => {}, () => {})
      }
    }
  }
  thunk(dispatch, null, api)
})

test('signUp happy path dispatches SIGN_UP_SUCCESS action', function (t) {
  t.plan(1)
  var count = 0
  var dispatch = function (action) {
    count++
    if (count === 2) t.equal(action.type, 'SIGN_UP_SUCCESS')
  }
  const thunk = signUp({email: '', password: ''})
  const api = {
    service: () => {
      return {
        create: (creds) => Promise.resolve(creds)
      }
    }
  }
  thunk(dispatch, null, api)
})

test('signUp unhappy path dispatches SIGN_UP_ERROR', function (t) {
  t.plan(1)
  var count = 0
  var dispatch = function (action) {
    count++
    if (count === 2) t.equal(action.type, 'SIGN_UP_ERROR')
  }
  const thunk = signUp({email: '', password: ''})
  const api = {
    service: () => {
      return {
        create: (creds) => Promise.reject('bang')
      }
    }
  }
  thunk(dispatch, null, api)
})

test('SIGN_IN_SUCCESS', function (t) {
  const initialState = {}
  freeze(initialState)
  const newAccount = {name: 'test', email: 'derp@dog.com'}
  const newState = reducer(initialState, signInSuccess(newAccount))
  t.equal(newState.account, newAccount)
  t.false(newState.signingIn)
  t.end()
})

test('SIGN_OUT', function (t) {
  const initialState = {name: 'test', email: 'derp@dog.com'}
  freeze(initialState)
  const newState = reducer(initialState, signOut())
  t.deepEqual(newState.account, {})
  t.end()
})

test('SIGN_IN_ERROR', function (t) {
  const initialState = {}
  const error = 'bang!'
  freeze(initialState)
  const newState = reducer(initialState, signInError(error))
  t.equal(newState.error, error)
  t.end()
})

test('SIGN_IN_START', function (t) {
  const initialState = {}
  freeze(initialState)
  const newState = reducer(initialState, signInStart())
  t.deepEqual(newState.account, initialState)
  t.true(newState.signingIn)
  t.end()
})

test('signIn dispatches SIGN_IN_START action', function (t) {
  function dispatch (action) {
    t.equal(action.type, 'SIGN_IN_START')
    t.end()
  }
  const thunk = signIn({email: '', password: ''})
  const api = {
    authenticate: (creds) => new Promise(() => {}, () => {})
  }
  thunk(dispatch, null, api)
})

test('signInStart happy path dispatches SIGN_IN_SUCCESS action', function (t) {
  t.plan(1)
  var count = 0
  var dispatch = function (action) {
    count++
    if (count === 2) t.equal(action.type, 'SIGN_IN_SUCCESS')
  }
  const thunk = signIn({email: '', password: ''})
  const api = {
    authenticate: (creds) => Promise.resolve(creds)
  }
  thunk(dispatch, null, api)
})

test('signInStart unhappy path dispatches SIGN_IN_ERROR', function (t) {
  t.plan(1)
  var count = 0
  var dispatch = function (action) {
    count++
    if (count === 2) t.equal(action.type, 'SIGN_IN_ERROR')
  }
  const thunk = signIn({email: '', password: ''})
  const api = {
    authenticate: (creds) => Promise.reject('bang')
  }
  thunk(dispatch, null, api)
})
