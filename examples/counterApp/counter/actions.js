module.exports = {
  incrementCounter: function() {
    return { type: 'INCREMENT' }
  },
  decrementCounter: function() {
    return { type: 'DECREMENT' }
  }
}
