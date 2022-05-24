import Sorter from "./Sorter"

export default class extends Sorter {
  constructor(public collection: string) {
    super()
  }

  get length(): number {
    return this.collection.length
  }

  compare(l: number, r: number): boolean {
    return this.collection[l].toLowerCase() > this.collection[r].toLowerCase()
  }

  swap(l: number, r: number): void {
    const arr: string[] = this.collection.split('')
    ;[arr[l], arr[r]] = [arr[r], arr[l]]
    this.collection = arr.join('')
  }
}