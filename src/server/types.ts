export type TypeResolvers =
  | [string, ...string[]]
  | [() => void, ...Array<() => void>];
