import { createApp } from 'src/main'
import { isDev } from 'src/config'

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    // 设置好router路径
    router.push(url)

    // 等待 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents) {
        return reject({ code: 404 })
      }

      const task = matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))

      Promise.all(task).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
