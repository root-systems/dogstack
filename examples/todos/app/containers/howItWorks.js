const React = require('react')
const HowItWorks = require('../components/howItWorks')
const { connect } = require('react-redux')

function howItWorks (props) {
  return (
    <div>
      <HowItWorks router={props.router} />
    </div>
  )
}

module.exports = connect((state) => state)(howItWorks)
