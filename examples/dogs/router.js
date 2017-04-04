import { Router, Route, IndexRoute } from 'react-router'
import React from 'react'

// Top Level Containers
import Layout from './layout/components/layout'
import DogsContainer from './dogs/containers/dogs'
import SignInContainer from './account/containers/signIn'
import SignUpContainer from './account/containers/signUp'

export default function ({ history, store }) {
  return <Router history={history}>
    <Route path='/' component={Layout}>
      <IndexRoute component={DogsContainer} />
      <Route path='/signin' component={SignInContainer} />
      <Route path='/signup' component={SignUpContainer} />
    </Route>
  </Router>
}
