<template>
  <div class="home-container">
    <home-sidebar />
    <home-page />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import HomeSidebar from './home-sidebar.vue'
import HomePage from './home-page.vue'
// import commands from './commands'
import '../element'

export default defineComponent({
  provide() {
    return {
      // commands
    }
  },
  components: {
    HomeSidebar,
    HomePage
  }
})
</script>

<style scoped>
.home-container {
  height: 100%;
  position: relative;
}
</style>
