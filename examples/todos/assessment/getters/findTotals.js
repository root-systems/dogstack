const _ = require('lodash')

module.exports = function processResults (answers) {
  const totals = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  }
  _.forEach(answers, (answer) => {
    switch (answer.category) {
      case 'a':
        totals.a += Number(answer.value)
        break

      case 'b':
        totals.b += Number(answer.value)
        break

      case 'c':
        totals.c += Number(answer.value)
        break

      case 'd':
        totals.d += Number(answer.value)
        break
      case 'e':
        totals.e += Number(answer.value)
        break
      case 'f':
        totals.f += Number(answer.value)
        break

      default:
        console.log('nothing happening jack')
    }
  })
  return totals
}
