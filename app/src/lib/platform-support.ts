import titleCase from 'ap-style-title-case'

interface IMenuTitle {
  /** Pick the correct style for the menu title.
   * `darwinName` is autogenerated if not provided.
   */
  (winName: string, darwinName?: string): string
  /** same as calling `menuTitle`, but it prepends “Show ” on macOS. */
  show(winName: string): string
  /** Translate a menu title from Windows style to macOS style */
  winToDarwin(winName: string): string
  /** Replace Windows-ese with macOS-ese (remove `&`, replace key terms) */
  translate(winName: string): string
}

export const menuTitle: IMenuTitle = ((winName: string, darwinName?: string) => {
  if (!darwinName) {
    darwinName = menuTitle.winToDarwin(winName)
  }
  return __DARWIN__ ? darwinName : winName
}) as IMenuTitle

// win => darwin, all lowercase
const transforms = new Map<RegExp, string>(Object.entries({
  'exit': 'quit',
  'recycle bin': 'Trash',
  'options': 'preferences',
  'explorer': 'Finder',
  'the command prompt': 'Terminal',
  'command prompt': 'Terminal',
}).map(([ k, v ]: ReadonlyArray<string>): [RegExp, string] => [ new RegExp(k, 'gi'), v ]))

menuTitle.translate = (winName: string) => {
  winName = winName.replace(/&/g, '')
  for (const [ from, to ] of transforms.entries()) {
    winName = winName.replace(from, to)
  }
  return winName
}
menuTitle.winToDarwin = (winName: string) => {
  winName = menuTitle.translate(winName)
  winName = titleCase(winName) || winName
  return winName
}

menuTitle.show = (winName: string) => {
  return menuTitle(winName, menuTitle.winToDarwin('Show ' + winName))
}
