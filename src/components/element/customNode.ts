import { registerNode } from '@antv/g6'

registerNode('anchorNode', {
  draw(cfg, group) {
    const titleColor = '#3693ff'
    const fieldsColor = '#e0eee8'
    // 标题的一格
    const size: number[] = [170, 30]
    // 内容区域的一格
    const subSize: number[] = [170, 30]

    const width: number = size[0]
    let height: number = size[1]
    const offsetX = -width / 2
    const offsetY = -height / 2

    const keyShape = group.addShape('rect', {
      attrs: {
        x: offsetX,
        y: offsetY,
        width: size[0],
        height: size[1],
        stroke: '#096DD9',
        fill: titleColor // 此处必须有fill 不然不能触发事件
        // radius: 4
      }
    })

    // 添加总边框
    group.addShape('rect', {
      attrs: {
        id: 'rect-border',
        x: offsetX,
        y: offsetY,
        width: size[0],
        height: height,
        stroke: 'gray',
        lineWidth: 1,
        shadowBlur: 15,
        borderRadius: 6,
        opacity: 0
      }
    })

    const markSize = 14

    group.addShape('rect', {
      attrs: {
        id: `add-marker`,
        x: offsetX + width,
        y: offsetY - markSize,
        stroke: 'rgba(0, 0, 0, 0.25)',
        fill: '#fff',
        width: markSize,
        height: markSize,
      },
    })
    group.addShape('text', {
      attrs: {
        id: 'add-marker-text',
        x: offsetX + width + 7,
        y: offsetY - 9,
        textAlign: 'center',
        textBaseline: 'middle',
        text: '+',
        fontSize: 16,
        cursor: 'pointer',
        fill: 'rgba(0, 0, 0, 0.25)',
      }
    })

    group.addShape('image', {
      attrs: {
        x: offsetX + 16,
        y: offsetY + 8,
        width: 20,
        height: 16,
        img: cfg.image
      }
    })
    group.addShape('image', {
      attrs: {
        x: offsetX + width - 32,
        y: offsetY + 8,
        width: 16,
        height: 16,
        img: cfg.stateImage
      }
    })
    // if (cfg.backImage) {
    //   const clip = new Shape.Rect({
    //     attrs: {
    //       x: offsetX,
    //       y: offsetY,
    //       width,
    //       height,
    //       fill: '#fff',
    //       radius: 4
    //     }
    //   })
    //   group.addShape('image', {
    //     attrs: {
    //       x: offsetX,
    //       y: offsetY,
    //       width,
    //       height,
    //       img: cfg.backImage,
    //       clip
    //     }
    //   })
    // }
    if (cfg.label) {
      group.addShape('text', {
        attrs: {
          x: offsetX + size[0] / 2,
          y: offsetY + size[1] / 2,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#fff'
        }
      })
    }
    // if (cfg.inPoints) {
    //   for (let i = 0; i < cfg.inPoints.length; i++) {
    //     let x
    //     let y = 0
    //     x = width * cfg.inPoints[i][0]
    //     y = height * cfg.inPoints[i][1]
    //     const id = `circle${uniqueId()}`
    //     group.addShape('circle', {
    //       attrs: {
    //         id: `circle${uniqueId()}`,
    //         parent: id,
    //         x: x + offsetX,
    //         y: y + offsetY,
    //         r: 10,
    //         isInPointOut: true,
    //         fill: '#1890ff',
    //         opacity: 0
    //       }
    //     })
    //     group.addShape('circle', {
    //       attrs: {
    //         id,
    //         x: x + offsetX,
    //         y: y + offsetY,
    //         r: 3,
    //         isInPoint: true,
    //         fill: '#fff',
    //         stroke: '#1890ff',
    //         opacity: 0
    //       }
    //     })
    //   }
    // }
    // if (cfg.outPoints) {
    //   for (let i = 0; i < cfg.outPoints.length; i++) {
    //     let x
    //     let y = 0
    //     x = width * cfg.outPoints[i][0]
    //     y = height * cfg.outPoints[i][1]
    //     const id = `circle${uniqueId()}`
    //     group.addShape('circle', {
    //       attrs: {
    //         id: `circle${uniqueId()}`,
    //         parent: id,
    //         x: x + offsetX,
    //         y: y + offsetY,
    //         r: 10,
    //         isOutPointOut: true,
    //         fill: '#1890ff',
    //         opacity: 0 // 默認0 需要時改成0.3
    //       }
    //     })
    //     group.addShape('circle', {
    //       attrs: {
    //         id,
    //         x: x + offsetX,
    //         y: y + offsetY,
    //         r: 3,
    //         isOutPoint: true,
    //         fill: '#fff',
    //         stroke: '#1890ff',
    //         opacity: 0
    //       }
    //     })
    //   }
    // }
    return keyShape
  },
  // 设置状态
  // setState(name, value, item) {
  //   const group = item.getContainer()
  //   const shape = group.get('children')[0] // 顺序根据 draw 时确定
  //   const children = group.findAll(g => {
  //     return g._attrs.parent === shape._attrs.id
  //   })
  //   const circles = group.findAll(circle => {
  //     return circle._attrs.isInPoint || circle._attrs.isOutPoint
  //   })
  //   const selectStyles = () => {
  //     shape.attr("cursor", "move");
  //     children.forEach(child => {
  //       child.attr('cursor', 'move')
  //       if (child._attrs.id === 'add-marker') {
  //         child.attr('cursor', 'pointer')
  //       }
  //     })
  //     circles.forEach(circle => {
  //       circle.attr('opacity', 1)
  //     })
  //   }
  //   const unSelectStyles = () => {
  //     circles.forEach(circle => {
  //       circle.attr('opacity', 0)
  //     })
  //   }

  //   const border = group.find(g => g._attrs.id === 'rect-border')
  //   const clickStyles = () => {
  //     border.attr('opacity', 1)
  //   }

  //   const unClickStyles = () => {
  //     border.attr('opacity', 0)
  //   }

  //   switch (name) {
  //     case 'selected':
  //       if (value) {
  //         clickStyles()
  //       } else {
  //         unClickStyles()
  //       }
  //       break
  //     case 'hover':
  //       if (value) {
  //         selectStyles()
  //       } else {
  //         unSelectStyles()
  //       }
  //       break
  //   }
  // },
  // update: function update(cfg, item) {
  //   const group = item.getContainer();
  //   const children = group.get('children');
  //   const node = children[0];
  //   const circleLeft = children[1];
  //   const circleRight = children[2];

  //   const stroke = cfg.style.stroke;

  //   // if (stroke) {
  //     node.attr('stroke', 10);
  //     circleLeft.attr('fill', stroke);
  //     circleRight.attr('fill', stroke);
  //   // }
  // },
})