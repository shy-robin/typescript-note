import axios, { AxiosPromise } from "axios"

interface HasId {
  id?: number
}

export default class<T extends HasId> {
  constructor(public baseUrl: string) {}

  fetch = (id: number): AxiosPromise => {
    const url = `${this.baseUrl}${id || ''}`
    return axios.get(url)
  }

  save = (data: T): AxiosPromise => {
    const { id } = data
    const url = `${this.baseUrl}${id || ''}`
    if (id) { // PUT
      return axios.put(url, data)
    } else { // POST
      return axios.post(url, data)
    }
  }
}