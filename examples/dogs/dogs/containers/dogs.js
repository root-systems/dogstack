import { connect } from 'react-redux'

import Dogs from '../components/dogs'

import { getIndexProps } from '../getters'

export default connect(
  getIndexProps
)(Dogs)
