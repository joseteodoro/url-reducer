const redis = require("redis")
const { promisify } = require("util")

const logger = require('../../../config/logger')
const config = require('../../../config')

const startRedis = () => {
  logger.info('starting redis')
  const client = redis.createClient(config.redis.url)
  client.on("error", function(error) {
    logger.error(error)
  })
  if (config.redis.password) {
    client.auth(config.redis.password)
  }
  const get = promisify(client.get).bind(client)
  const set = promisify(client.set).bind(client)
  const del = promisify(client.del).bind(client)
  return { get, set, del }
}

module.exports = startRedis()
