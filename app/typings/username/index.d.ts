declare module 'username' {
  interface Username {
    (): Promise<string>
    sync(): string
  }
  const username: Username
  export = username
}
