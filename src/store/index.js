import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    state: {
      appName: 'Vue-SSR'
    },
    actions: {
      UPDATE_NAME ({ commit }) {
        return new Promise((resolve) => {
          setTimeout(() => {
            commit('UPDATE_NAME', { name: 'plus' })
            resolve()
          }, 1000)
        })
      }
    },
    mutations: {
      UPDATE_NAME (state, { name }) {
        state.appName += name
      }
    }
  })
}
