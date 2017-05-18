const test = require('ava')

var dogstack
test('dogstack exports', t => {
  dogstack = require('../')
  t.truthy(dogstack)
})
