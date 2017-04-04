import { connect } from 'react-redux'

import SignIn from '../components/signIn'

import { signIn } from '../actions'
import { getSignInProps } from '../getters'

export default connect(
  getSignInProps,
  {signIn}
)(SignIn)
