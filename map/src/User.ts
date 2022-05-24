import faker from 'faker'
import { Mappable } from './Map'

export default class implements Mappable {
  name: string
  location: {
    lat: number
    lng: number
  }
  constructor() {
    this.name = faker.name.firstName()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }
  infoContent(): string {
    return `My name is ${this.name}.`
  }
}