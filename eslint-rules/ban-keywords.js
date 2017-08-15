// logic based on http://astexplorer.net/#/Lmzgbm2iRq

const BANNED_NAMES = 'any number string boolean never'.split(' ')

module.exports = {
  meta: {
    docs: {
      description: 'Do not use TypeScript types as variable names',
      category: 'Best Practices',
    },
  },
  create(context) {
    return {
      Identifier(node) {
        if (
          BANNED_NAMES.includes(node.name) &&
          (node.parent.type !== 'MemberExpression' ||
            node.parent.computed ||
            node.parent.object === node)
        ) {
          context.report({
            node: node,
            message: 'Do not use the variable name `{{ name }}`.',
            data: {
              name: node.name,
            },
          })
        }
      },
    }
  },
}
