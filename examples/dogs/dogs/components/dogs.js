import React from 'react'
import { Link } from 'react-router'
import { connect as connectFela } from 'react-fela'
import dogNames from 'dog-names'
import map from 'lodash/map'
import keys from 'lodash/keys'
import random from 'lodash/random'

import Dog from './dog'

import gcs from '../util/generate-component-styles'
import styles from '../styles/dogs'

class Dogs extends React.Component {
  componentDidMount () {
    this.props.findDog()
  }

  render () {
    const { styles, dogs, createDog, removeDog } = this.props

    return <div className={styles.container}>
      <span>MY DOGS</span>
      <div className={styles.dogsContainer}>
        {
          map(dogs, (dog, i) => {
            return <Dog key={i} name={dog.name} />
          })
        }
      </div>
      <button
        className={styles.adoptButton}
        onClick={() => { createDog({ name: dogNames.allRandom() }) }}
      >
        Adopt a dog!
      </button>
      <button
        className={styles.adoptButton}
        onClick={() => {
          const randomDogId = keys(dogs)[random(keys(dogs).length - 1)]
          removeDog(randomDogId)
        }}
      >
        Give a dog to a friend!
      </button>
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  }
}

export default connectFela(
  gcs(styles)
)(Dogs)
