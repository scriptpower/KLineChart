'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/k-charts.prd.min.js')
} else {
  module.exports = require('./dist/k-charts.dev.js')
}
