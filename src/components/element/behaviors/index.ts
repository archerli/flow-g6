import G6 from '@antv/g6'
import hoverNode from './hover-node'

const behavors = {
  'hover-node': hoverNode
}

export function initBehavors() {
  for (const key in behavors) {
    G6.registerBehavior(key, behavors[key])
  }
}
