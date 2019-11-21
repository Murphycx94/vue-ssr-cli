import Vue from 'vue'
import App from './App'
import { createRouter } from 'src/router'
import { createStore } from 'src/store'
import 'src/main.less'

console.log(App)

export const createApp = () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}
