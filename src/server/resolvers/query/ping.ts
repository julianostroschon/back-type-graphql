import { Context } from 'contracts/general'

export function pingzim(root: any, args: any, context: Context) {
  console.log(root, args, context)
  return 'pong'
}

export function hello() {
  return 'hello world'
}
