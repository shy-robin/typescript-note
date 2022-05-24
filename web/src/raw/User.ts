import axios from "axios"

interface UserProps {
  id?: number
  name?: string
  age?: number
}

// type alias
type Callback = () => void

export default class {
  // 使用 [] 限制 key 的类型
  events: { [eventName: string]: Callback[] } = {}

  constructor(private data: UserProps) {}

  set(update: UserProps): void {
    Object.assign(this.data, update)
  }

  get<T extends keyof UserProps>(propName: T): UserProps[T] {
    // 泛型约束，使 propName 的类型限制为接口 UserProps 的键类型
    return this.data[propName]
  }

  on(eventName: string, callback: Callback): void {
    const callbacks = this.events[eventName] || []
    callbacks.push(callback)
    this.events[eventName] = callbacks
  }

  trigger(eventName: string): void {
    if (!this.events[eventName] || !this.events[eventName].length) return

    this.events[eventName].forEach((callback) => {
      callback()
    })
  }

  fetch(): void {
    const url = `http://localhost:3000/users/${this.data.id || ''}`
    axios.get(url).then((response) => {
      console.log(response.data)
    })
  }

  save() {
    const url = `http://localhost:3000/users/${this.data.id || ''}`
    if (this.data.id) { // PUT
      axios.put(url, this.data)
    } else { // POST
      axios.post(url, this.data)
    }
  }
}