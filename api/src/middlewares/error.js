const logger = require('../../../config/logger')

module.exports = (ctx, next) => next()
  .catch(error => {
    logger.error(error)
    const message = error.message || error.code || JSON.stringify(error)
    ctx.status = message.status
    ctx.body = message.body
  })
