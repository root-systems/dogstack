import { connect } from 'react-redux'

import Todos from '../components/todos'

export default connect(
  (state) => state
)(Todos)
