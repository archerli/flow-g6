<template>
  <section class="sidebar-container">
    <div class="scrollbar">
      <ul
        class="model-list"
      >
        <li
          v-for="group in data.list"
          :key="group.id"
          class="group-item"
          :draggable="true"
        >
          <div class="group-title">
            {{ group.name }}
          </div>
          <div class="content">
            {{ group.label }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { sidebarList } from '../../utils/mock-data.js'

export default defineComponent({
  setup() {
    const data = reactive({
      list: sidebarList
    })

    function handleDragstart() {
      // this.offsetX = e.offsetX
      // this.offsetY = e.offsetY
    }

    function handleDragEnd() {
      // const c = {
      //   ...item,
      //   id: `node${uniqueId()}`
      // }
      // this.addNode(e, c, {
      //   method: 'drag-add'
      // })
    }

    return {
      data,
      handleDragstart,
      handleDragEnd
    }
  }
})
</script>

<style scoped>
ol, ul, li{
  list-style: none;
}

.sidebar-container {
  background: #ECEFF4;
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  height: 100%;
}

.scrollbar {
  height: 100%;
  overflow-y: auto;
}

.model-list {
  margin: 0 0 180px 0;
  padding: 10px;
}

.model-list li {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  line-height: 26px;
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0);
  list-style-type: none;
}
.model-list li:hover {
  background: white;
  border: 1px solid #ced4d9;
  cursor: move;
}

.group-title {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
}

.group-item {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px;
}


</style>