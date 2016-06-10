var React = require('react');

var Parrots = React.createClass({

  render: function() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <img src="../../boredparrot.gif"/>
        <img src="../../boredparrot.gif"/>
        <img src="../../boredparrot.gif"/>
      </div>
    );
  }

});

module.exports = Parrots;
