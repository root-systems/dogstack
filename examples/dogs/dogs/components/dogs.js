import React from 'react'

import Dog from './dog'

export default class Dogs extends React.Component {
  componentDidMount () {
    this.props.findDog()
  }

  render () {
    return <div>
      <span>DOGS</span>
      {
        this.props.dogs.map((dog) => {
          return <Dog name={dog.name} />
        })
      }
    </div>
  }
}
