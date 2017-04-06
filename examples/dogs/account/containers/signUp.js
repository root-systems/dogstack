import { connect } from 'react-redux'

import SignUp from '../components/signUp'

import { signUp } from '../actions'

export default connect(
  null,
  {signUp}
)(SignUp)

