const Router = require('koa-router')

const error = require('./middlewares/error')

const links = require('./handlers')

const router = new Router()

router.use(error)

router.get('/route/:key', links.navigate)
router.post('/api/v1/links', links.add)
router.delete('/api/v1/links/:key', links.remove)

module.exports = router
