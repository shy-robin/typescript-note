import Eventing from './Eventing'
import axios, { AxiosResponse } from 'axios'

export default class<T, K> {
  models: T[] = []
  events: Eventing = new Eventing()

  constructor(
    public baseUrl: string,
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  fetch() {
    axios.get(this.baseUrl)
    .then((response: AxiosResponse) => {
      response.data.forEach((json: K) => {
        this.models.push(this.deserialize(json))
      })
    })
  }
}