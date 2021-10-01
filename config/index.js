const { env } = process
const pck = require('../package.json')

const environment = env.NODE_ENV || 'dev'

module.exports = {
  api: {
    name: pck.name,
    env: environment,
    port: env.API_PORT || 3000,
  },
  redis: {
    url: 'redis://127.0.0.1:6379',
  },
  timezone: env.TIMEZONE || 'America/New_York'
}
