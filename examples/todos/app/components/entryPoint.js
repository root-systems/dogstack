const React = require('react')

class entryPoint extends React.Component {
  startAssessment (e) {
    e.preventDefault()
    const { setCurrentUser, router } = this.props
    const name = this.refs.name.value
    const email = this.refs.email.value
    const yearOfBirth = this.refs.yearOfBirth.value
    setCurrentUser({
      name,
      email,
      yearOfBirth
    })
    router.push(`/howitworks`)
  }
  render () {
    return (
      <div>
        <form className='entryPointForm'>
          <input placeholder='Name' type='text' ref='name' />
          <input placeholder='Email' type='text' ref='email' />
          <input placeholder='Year of Birth' ref='yearOfBirth' />
          <button onClick={this.startAssessment.bind(this)}>Start</button>
        </form>
      </div>
    )
  }
}

module.exports = entryPoint
