/**
 * button-group-order
 *
 * This custom tslint rule is highly specific to GitHub Desktop and attempts
 * to enforce a consistent order for buttons inside of a <ButtonGroup>
 * component.
 *
 * Example
 *
 * <ButtonGroup>
 *  <Button>Cancel</Button>
 *  <Button type='submit'>Ok</Button>
 * </ButtonGroup>
 *
 * The example above will trigger a tslint error since we want to enforce
 * a consistent order of Ok/Cancel-style buttons (the button captions vary)
 * such that the primary action precedes any secondary actions.
 *
 * See https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/
 *
 * We've opted for using the Windows order of OK, Cancel in our codebase, the
 * actual order at runtime will vary depending on platform.
 *
**/

module.exports = {
  create(context) {
    return {
      JSXElement(node) {
        if (node.openingElement.name.name !== 'ButtonGroup') {
          return
        }

        const buttons = node.children
          .map(child => {
            // return nothing if the child is not a button
            if (child.type === 'Literal' && child.value.match(/^\s*$/)) {
              return
            } else if (child.type === 'JSXElement') {
              if (child.openingElement.name.name === 'Button') {
                return child.openingElement
              }
            }

            context.report(
              child,
              'Forbidden child content, expected <Button>.' +
                ' ButtonGroups should only contain <Button> elements.'
            )
          })
          .filter(x => x)

        if (buttons.length >= 2) {
          const buttonsWithTypeAttr = buttons.map(button => {
            const typeAttr = button.attributes.find(
              attr => attr.name.name === 'type'
            )

            let value
            if (typeAttr) {
              const { value: typeValue } = typeAttr
              if (typeValue.type === 'JSXExpressionContainer') {
                // <Button type={'foo'} />
                if (typeValue.expression.type === 'Literal') {
                  value = typeValue.expression.value
                }
              } else if (typeValue.type === 'Literal') {
                value = typeValue.value
              }
            }
            return [button, value]
          })
          const primaryButtonIdx = buttonsWithTypeAttr.findIndex(
            ([_, type]) => type === 'submit'
          )

          if (primaryButtonIdx > 0) {
            context.report(
              buttons[primaryButtonIdx],
              'Wrong button order in ButtonGroup.' +
                ' ButtonGroups should have the primary button as its first child'
            )
          }
        }
      },
    }
  },
}
