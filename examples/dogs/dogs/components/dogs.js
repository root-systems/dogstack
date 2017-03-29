const React = require('react')

export default class Dogs extends React.Component {
  componentDidMount () {
    this.props.findDog()
  }

  render () {
    return <div>
      <span>DOGS</span>
      {
        this.props.dogs.map((dog) => {
          return <span>{dog}</span>
        })
      }
    </div>
  }
}
