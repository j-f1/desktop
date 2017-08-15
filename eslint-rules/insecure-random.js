// strings from https://github.com/Microsoft/tslint-microsoft-contrib/blob/b720cd9/src/insecureRandomRule.ts

module.exports = {
  meta: {
    docs: {
      description: 'Do not use insecure sources for random bytes',
      category: 'Best Practices',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node
        const isMemberExpression = callee.type === 'MemberExpression'
        if (
          isMemberExpression &&
          callee.object.name === 'Math' &&
          callee.property.name === 'random'
        ) {
          context.report({
            node,
            message:
              'The Math.random function produces insecure random numbers.',
          })
        }
        if (
          (isMemberExpression &&
            callee.property.name === 'pseudoRandomBytes') ||
          callee.name === 'pseudoRandomBytes'
        ) {
          context.report({
            node,
            message:
              'The crypto.pseudoRandomBytes function produces insecure random numbers.',
          })
        }
      },
    }
  },
}
