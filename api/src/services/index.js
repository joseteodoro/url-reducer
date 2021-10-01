const uuid = require('uuid').v4
const redis = require('./redis')

const findLink = key => redis.get(key)

const createLink = url => {
  const key = uuid()
  return redis.set(key, url)
    .then(_ => key)
}

const deleteLink = key => redis.del(key)

module.exports = { findLink, deleteLink, createLink }
