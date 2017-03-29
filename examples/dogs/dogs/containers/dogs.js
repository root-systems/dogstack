import { connect } from 'react-redux'

import Dogs from '../components/dogs'

import { findDog } from '../actions'

import { getIndexProps } from '../getters'

export default connect(
  getIndexProps,
  {
    findDog
  }
)(Dogs)
