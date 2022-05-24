import faker from "faker"
import { Mappable } from './Map'

export default class implements Mappable {
  name: string
  catchPhrase: string
  location: {
    lat: number
    lng: number
  }
  constructor() {
    this.name = faker.company.companyName()
    this.catchPhrase = faker.company.catchPhrase()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }
  infoContent(): string {
    return `
      Company: ${this.name}
      CatchPhrase: ${this.catchPhrase}
    `
  }
}
