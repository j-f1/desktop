# Migration from TSLint to ESLint

## Core TSLint Rules

- [ ] `class-name` [pending PR merge](https://github.com/nzakas/eslint-plugin-typescript/pull/44)
- [ ] `member-ordering` [pending PR merge](https://github.com/nzakas/eslint-plugin-typescript/pull/46)
- [ ] `typedef-whitespace` [pending PR merge](https://github.com/nzakas/eslint-plugin-typescript/pull/43)

## TSLint-Microsoft-contrib rules

- [ ] [`no-stateless-class`](https://github.com/Microsoft/tslint-microsoft-contrib/blob/b720cd9827a13c2878d304193544a5b030953ecb/src/noStatelessClassRule.ts)
- [ ] [`promise-must-complete`](https://github.com/Microsoft/tslint-microsoft-contrib/blob/b720cd9827a13c2878d304193544a5b030953ecb/src/promiseMustCompleteRule.ts)
- [ ] [`react-this-binding-issue`](https://github.com/Microsoft/tslint-microsoft-contrib/blob/b720cd9827a13c2878d304193544a5b030953ecb/src/reactThisBindingIssueRule.ts)
- [ ] [`react-unused-props-and-state`](https://github.com/Microsoft/tslint-microsoft-contrib/blob/b720cd9827a13c2878d304193544a5b030953ecb/src/reactUnusedPropsAndStateRule.ts)


## Custom rules:

- [x] [`button-group-order`](./tslint-rules/buttonGroupOrderRule.ts)
- [ ] [`react-no-unbound-dispatcher-props`](./tslint-rules/reactNoUnboundDispatcherPropsRule.ts)
- [ ] [`react-proper-lifecycle-methods`](./tslint-rules/reactProperLifecycleMethodsRule.ts)
- [ ] [`react-readonly-props-and-state`](./tslint-rules/reactReadonlyPropsAndStateRule.ts)
