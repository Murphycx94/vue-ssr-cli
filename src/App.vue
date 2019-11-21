<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted () {
    console.log('APP.vue mounted')
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
