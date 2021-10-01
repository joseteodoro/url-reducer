const { findLink, deleteLink, createLink } = require('../services')

const formatPage = link => ({
  status: 200,
  body: `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="refresh" content="0; url='${link}'" />
    </head>
    <body>
      <p>Please follow <a href="${link}">this link</a>.</p>
    </body>
  </html>`
})

const outPut = ctx => ({ body, status = 200 }) => {
  ctx.status = status
  ctx.body = body
}

const notFound = () => ({ status: 404, body: {message: 'resource not found'} })

const navigate = ctx => console.log('#navigate', ctx.params) || findLink(ctx.params.key)
    .then(link => link ? formatPage(link) : notFound())
    .then(outPut(ctx))

const add = ctx => {
  console.log('#add', ctx.request.body)
  const { url } = ctx.request.body
  return createLink(url)
    .then(shortened => ({
      status: 201,
      body: {
        shortened,
        source: url
      }
    }))
    .then(outPut(ctx))
}

const remove = ctx => console.log('#remove', ctx.params) || findLink(ctx.params.key)
  .then(found => found && deleteLink(key))
    .then(_ => ({
      status: 204,
      body: {
        message: 'deleted'
      }
    }))
    .then(outPut(ctx))

module.exports = {
  navigate,
  add,
  remove,
}
