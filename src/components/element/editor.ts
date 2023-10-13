
import * as G6 from '@antv/g6'
interface G6Graph extends G6.Graph {
  modes: {
    [key: string]: string[];
  };
}

class Editor {
  container: HTMLElement;
  height: number;
  width: number;
  graph: G6Graph;

  constructor(container: HTMLElement, height: number, width: number){
    this.container = container;
    this.height = height;
    this.width = width;
    this.graph = new G6.Graph({
      container,
      height,
      width,
      modes: {
        // 支持的 behavior
        default: [
          'drag-node',
          'drag-canvas',
          'zoom-canvas',
          'hover-node',
          'click',
          'select-node',
          'hover-edge',
          'keyboard',
          'customer-events'
        ],
        addEdge: ['add-edge'],
        moveNode: ['drag-item']
      }
    }) as G6Graph
  }
}

export default Editor