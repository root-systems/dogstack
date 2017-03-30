import { connect } from 'react-redux'

import Dogs from '../components/dogs'

import { createDog, findDog, updateDog, removeDog } from '../actions'

import { getIndexProps } from '../getters'

export default connect(
  getIndexProps,
  {
    createDog,
    findDog,
    updateDog,
    removeDog
  }
)(Dogs)
