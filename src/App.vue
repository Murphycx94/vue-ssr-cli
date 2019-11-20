<template>
  <div id="app">
    Vue-SSR渲染成功123
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted () {
    console.log('Vue-SSR渲染成功')
  }
}
</script>