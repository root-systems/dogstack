var React = require('react');

var Parrots = require('./parrots')

var Counter = React.createClass({

  render: function() {
    var { increment, decrement } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 200}}>
        <Parrots />
        <button onClick={function() { increment() }}>+</button>
        <span>{this.props.count}</span>
        <button onClick={function() { decrement() }}>-</button>
        <Parrots />
      </div>
    );
  }

});

module.exports = Counter;
