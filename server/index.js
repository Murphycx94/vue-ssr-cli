const fs = require('fs')
const { resolve } = require('../build/utils')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

/**
 * 配置静态资源
 */
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))

const template = fs.readFileSync(resolve('public/index.template.html'), 'utf-8')

let renderer
let readPromise

const createRenderer = (bundle, options) => {
  return createBundleRenderer(bundle, Object.assign({
    runInNewContext: false, // 推荐
    template // 页面模板
  }, options))
}

if (isProd) {
  const serverBundle = require('../dist/vue-ssr-server-bundle')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(serverBundle, { clientManifest })
} else {
  const setupDev = require('./dev')
  readPromise = setupDev(app, ({ bundle, clientManifest }) => {
    renderer = createRenderer(bundle, { clientManifest })
  })
}

const render = (req, res) => {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue-SRR', // default title
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : async (req, res) => {
  readPromise.then(() => render(req, res))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})