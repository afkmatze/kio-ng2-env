
export type Nested<T> = T & {
  [key:string]: T
}