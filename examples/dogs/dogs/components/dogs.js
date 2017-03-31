import React from 'react'
import { connect as connectFela } from 'react-fela'

import Dog from './dog'

import styles from '../styles/dogs'

class Dogs extends React.Component {
  componentDidMount () {
    this.props.findDog()
  }

  render () {
    return <div className={this.props.styles.container}>
      <span>DOGS</span>
      {
        this.props.dogs.map((dog) => {
          return <Dog name={dog.name} />
        })
      }
      <button>Adopt a dog!</button>
    </div>
  }
}

export default connectFela((props) => ({ renderRule }) => {
  return {
    container: renderRule(styles.container, props)
  }
})(Dogs)
