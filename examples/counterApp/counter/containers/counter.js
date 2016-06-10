var React = require('react');
var { connect } = require('react-redux')

//components
var Counter = require('../components/counter')

//getters
var { getCounterProps } = require('../getters')

//actions
var { incrementCounter, decrementCounter } = require('../actions')

var CounterContainer = React.createClass({

  render: function() {
    var { counter, incrementCounter, decrementCounter } = this.props

    return (
      <Counter
        count={counter}
        increment={incrementCounter}
        decrement={decrementCounter}
      />
    );
  }

});

module.exports = connect(
  getCounterProps,
  { incrementCounter, decrementCounter }
)(CounterContainer);
