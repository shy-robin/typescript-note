export default class<T> {
  constructor(public data: T) {}

  set = (update: T): void => {
    Object.assign(this.data, update)
  }

  get = <K extends keyof T>(key: K): T[K] => {
    // 泛型约束，使 key 的类型限制为接口 UserProps 的键类型
    return this.data[key]
  }

  getAll = (): T => {
    return this.data
  }
}