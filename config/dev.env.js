'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // REQ_BASE_URL: '"https://api.feedlikes.ru"'
  REQ_BASE_URL: '"http://localhost:8000"'
})
