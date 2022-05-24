import Attributes from "./Attributes"
import Eventing from "./Eventing"
import Model from "./Model"
import Sync from "./Sync"
import Collection from "./Collection"

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const baseUrl = 'http://localhost:3000/users/'

export default class User extends Model<UserProps> {
  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      baseUrl,
      (json: UserProps) => new User(json)
    )
  }
  constructor(data: UserProps) {
    super(
      new Attributes<UserProps>(data),
      new Eventing(),
      new Sync<UserProps>(baseUrl),
    )
  }
  setRandomAge(): void {
    this.set({
      age: Math.ceil(Math.random() * 100)
    })
  }
}