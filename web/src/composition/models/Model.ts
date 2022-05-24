import { AxiosResponse, AxiosPromise } from 'axios'

interface Events {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

interface Attributes<T> {
  set(update: T): void
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
}

interface HasId {
  id?: number
}

const baseUrl = 'http://localhost:3000/users/'

export default class<T extends HasId> {
  constructor(
    private attributes: Attributes<T>,
    private events: Events,
    private sync: Sync<T>,
  ) {}
  // accessors
  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
  get get() {
    return this.attributes.get
  }
  set(update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }
  fetch(): void {
    const id = this.get('id')

    if (typeof id === 'number') {
      this.sync.fetch(id).then((response: AxiosResponse): void => {
        this.set(response.data)
      })
    } else {
      throw new Error('Cannot fetch without an id')
    }
  }
  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((): void => {
      this.trigger('save')
    })
    .catch((): void => {
      this.trigger('error')
    })
  }
}