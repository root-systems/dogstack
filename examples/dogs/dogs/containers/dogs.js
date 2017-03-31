import { connect as connectRedux } from 'react-redux'

import Dogs from '../components/dogs'

import { createDog, findDog, updateDog, removeDog } from '../actions'

import { getIndexProps } from '../getters'

export default connectRedux(
  getIndexProps,
  {
    createDog,
    findDog,
    updateDog,
    removeDog
  }
)(Dogs)
