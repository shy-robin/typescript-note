// type alias
type Callback = () => void

export default class {
  // 使用 [] 限制 key 的类型
  events: { [eventName: string]: Callback[] } = {}

  // 这里使用箭头函数，使 this 指向父层作用域，即 Eventing 的实例
  on = (eventName: string, callback: Callback): void => {
    const callbacks = this.events[eventName] || []
    callbacks.push(callback)
    this.events[eventName] = callbacks
  }

  trigger = (eventName: string): void => {
    if (!this.events[eventName] || !this.events[eventName].length) return
    
    this.events[eventName].forEach((callback) => {
      callback()
    })
  }
}