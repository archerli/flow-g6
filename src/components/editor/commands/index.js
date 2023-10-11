
export default {
  executeCommand(key, datas) {
    const list = []
    datas.map(data => {
      let model = data
      if (key === 'add') {
        model.id = data.id || data.type
      }
      if (key === 'delete') {
        if (data.getType() === 'node') {
          const edges = data.getEdges()
          model = data.getModel()
          model.type = data.getType()
          model.id = data.get('id')
          edges.forEach(edge => {
            const edgeModel = edge.getModel()
            edgeModel.type = 'edge'
            edgeModel.id = edge.get('id')
            list.push(edgeModel)
          })
        } else if (data.getType() === 'edge') {
          model = data.getModel()
          model.type = data.getType()
          model.id = data.get('id')
        }
      }
      list.push(model)

      this.doCommand(key, model)
    })
    this.undoList.push({ key, datas: list })
    if (key === 'delete') {
      this.redoList = []
    }
    this.editor.emit(key, { undoList: this.undoList, redoList: this.redoList })
  },

  doCommand(key, data) {
    switch (key) {
      case 'add':
        this.add(data.type, data)
        break
      case 'update':
        this.update(data.item, data.newModel)
        break
      case 'delete':
        this.remove(data)
        break
    }
  },

  add(type, item) {
    this.editor.add(type, item)
  },

  update(item, model) {
    this.editor.update(item, model)
  },

  remove(item) {
    // 删除一个节点时 递归删除其所有叶子节点
    const graph = this.editor.graph
    const branchs = []
    graph.getEdges().forEach(edge => {
      if (edge.getModel().source === item.id) {
        const targetId = edge.getModel().target
        const target = graph.findById(targetId);
        branchs.push(target && target.getModel())
      }
    })
    branchs.forEach(branch => {
      this.remove(branch)
    })
    this.editor.remove(item)
  },

  undo() {
    const undoData = this.undoList.pop()
    const edgeList = []
    const list = []
    for (let i = 0; i < undoData.datas.length; i++) {
      const data = undoData.datas[i]
      if (data.type === 'edge') {
        edgeList.push(data)
        continue
      }
      list.push(data)
      this.doundo(undoData.key, data)
    }
    for (let i = 0; i < edgeList.length; i++) {
      const edge = edgeList[i]
      if (edge.source.destroyed) {
        edge.source = edge.sourceId
      }
      if (edge.target.destroyed) {
        edge.target = edge.targetId
      }
      list.push(edge)
      this.doundo(undoData.key, edge)
    }
    this.redoList.push({ key: undoData.key, datas: list })
    this.editor.emit(undoData.key, { undoList: this.undoList, redoList: this.redoList })
  },

  doundo(key, data) {
    switch (key) {
      case 'add':
        this.remove(data)
        break
      case 'update':
        this.update(data.item, data.oldModel)
        break
      case 'delete':
        this.add(data.type, data)
        break
    }
  },

  redo() {
    const redoData = this.redoList.pop()
    const list = []
    const edgeList = []
    for (let i = 0; i < redoData.datas.length; i++) {
      const data = redoData.datas[i]
      if (data.type === 'edge') {
        edgeList.push(data)
        continue
      }
      list.push(data)
      this.doredo(redoData.key, data)
    }
    for (let i = 0; i < edgeList.length; i++) {
      const edge = edgeList[i]
      if (edge.source.destroyed) {
        edge.source = edge.sourceId
      }
      if (edge.target.destroyed) {
        edge.target = edge.targetId
      }
      list.push(edge)
      this.doredo(redoData.key, edge)
    }
    this.undoList.push({ key: redoData.key, datas: list })

    this.editor.emit(redoData.key, { undoList: this.undoList, redoList: this.redoList })
  },

  doredo(key, data) {
    switch (key) {
      case 'add':
        this.add(data.type, data)
        break
      case 'update':
        this.update(data.item, data.newModel)
        break
      case 'delete':
        this.remove(data)
        break
    }
  },

  delete(item) {
    this.executeCommand('delete', [item])
  }
}
