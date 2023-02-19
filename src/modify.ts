import { rehype } from 'rehype'
import { visit } from 'unist-util-visit'
import { hasProperty } from 'hast-util-has-property'

export default (html: string) => {
  const context = rehype()
  const tree = context.parse(html)
  visit(tree, 'element', (node, test, visitor) => {
    if (['head'].includes(node.tagName)) {
      // remove script with type='module'
      node.children = node.children.filter(item => {
        if (item.type === 'element') {
          return !(item.tagName === 'script' && item.properties?.type === 'module')
        }
        return true
      })
    }
    if (node.tagName === 'script') {
      const { properties = {} } = node

      hasProperty(node, 'noModule') && delete properties.noModule
      hasProperty(node, 'crossOrigin') && delete properties.crossOrigin
      if (hasProperty(node, 'dataSrc')) {
        properties.src = properties.dataSrc
        delete properties.dataSrc
      }
      node.properties = properties
    }
  })

  return context.stringify(tree)
}