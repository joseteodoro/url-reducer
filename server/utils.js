const redis = require('../api/src/services/redis')

const allowOrigins = (origins = []) => (ctx) => {
  const requestOrigin = ctx.request.header.origin
  return (origins.some(regex => regex.test(requestOrigin)))
    ? requestOrigin
    : ctx.throw(`${requestOrigin} is not a valid origin`)
}

const healthcheck = ctx =>
  redis.get('not_found_key')
    .then(_ => {
      ctx.body = { redis: true, server: true, timestamp: new Date() }
    })

module.exports = {
  allowOrigins,
  healthcheck,
}
