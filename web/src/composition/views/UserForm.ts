import User, { UserProps } from "../models/User"
import View from "./View"

export default class extends View<User, UserProps> {
  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  onSetNameClick = (): void => {
    const input = document.querySelector('.name-input') as HTMLInputElement | null
    if (input) {
      this.model.set({ name: input.value })
    }
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    }
  }

  template(): string {
    return `
      <div>
        <h2>User Form</h2>
        <h3>user name: ${this.model.get('name')}</h3>
        <h3>user age: ${this.model.get('age')}</h3>
        <div>
          <input class="name-input">
          <button class="set-name">Set name</button>
          <button class="set-age">Set random age</button>
        </div>
      </div>
    `
  }
}