import React from 'react'
import { connect as connectFela } from 'react-fela'
import dogNames from 'dog-names'

import Dog from './dog'

import gcs from '../util/generate-component-styles'
import styles from '../styles/dogs'

class Dogs extends React.Component {
  componentDidMount () {
    this.props.findDog()
  }

  render () {
    const { styles, dogs, createDog } = this.props

    return <div className={styles.container}>
      <span>MY DOGS</span>
      <div className={styles.dogsContainer}>
        {
          dogs.map((dog, i) => {
            return <Dog key={i} name={dog.name} />
          })
        }
      </div>
      <button
        className={styles.adoptButton}
        onClick={() => { createDog({ name: dogNames.allRandom() }) }}
      >Adopt a dog!</button>
    </div>
  }
}

export default connectFela(
  gcs(styles)
)(Dogs)
