<template>
  <div class="home-container">
    <home-sidebar />
    <home-page />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeSidebar from './home-sidebar.vue'
import HomePage from './home-page.vue'

export default defineComponent({
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
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
</style>
