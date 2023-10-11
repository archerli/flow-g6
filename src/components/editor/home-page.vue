<template>
  <section class="page">
    <div id="graph-container" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import G6 from '@antv/g6'

onMounted(() => {
  init()
})

function init() {
  const container = document.getElementById('graph-container') as HTMLElement
  const rect = container.getBoundingClientRect()
  const { height, width } = rect

  const graph = new G6.Graph({
    container,
    height,
    width,
    modes: {
      // 支持的 behavior
      default: [
        'drag-canvas',
        'zoom-canvas',
        'hover-node',
        'click',
        'select-node',
        'hover-edge',
        'keyboard',
        'customer-events'
      ],
      mulitSelect: ['mulit-select'],
      addEdge: ['add-edge'],
      moveNode: ['drag-item']
    }
  })

  // 监听 dragstart 事件，开始拖拽时设置数据
  // dragNode.addEventListener('dragstart', event => {
  //   event.dataTransfer.setData('text/plain', '');
  // });

  // 监听 drop 事件，在 canvas 画布上生成节点
  container.addEventListener('drop', event => {
    event.preventDefault();

    // 获取鼠标相对于画布的坐标
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 创建 G6 节点
    const node = {
      id: Math.random().toString(36).substr(2),
      x,
      y,
      size: 100,
      label: '新节点'
    };

    // 添加节点到画布上
    graph.addItem('node', node);

    // 更新画布
    graph.refresh();
  });

  // 阻止默认 drop 事件
  container.addEventListener('dragover', event => {
    event.preventDefault();
  });
  // const { editor, command } = this.$parent
  // editor.emit('afterAddPage', { graph: this.graph, command })

  // this.readData()
}
</script>

<style scoped>
.page {
  margin-left: 220px;
  background: #f5f5f5;
  height: 100%;
  overflow: auto;
}
#graph-container {
  height: 100%;
  width: 100%;
}
</style>