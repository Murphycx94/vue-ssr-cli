<template>
  <div>
    Home
    {{ appName }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('UPDATE_NAME')
  },
  computed: {
    ...mapState(['appName'])
  }
}
</script>
