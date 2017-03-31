import React from 'react'
import { connect as connectFela } from 'react-fela'

import Dog from './dog'

import gcs from '../util/generate-component-styles'
import styles from '../styles/dogs'

class Dogs extends React.Component {
  componentDidMount () {
    this.props.findDog()
  }

  render () {
    const { styles, dogs } = this.props

    return <div className={styles.container}>
      <span>DOGS</span>
      {
        dogs.map((dog) => {
          return <Dog name={dog.name} />
        })
      }
      <button>Adopt a dog!</button>
    </div>
  }
}

export default connectFela(
  gcs(styles)
)(Dogs)
