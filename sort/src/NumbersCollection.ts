import Sorter from "./Sorter"

export default class extends Sorter {
  constructor(public collection: number[]) {
    super()
  }

  get length(): number {
    return this.collection.length
  }

  compare(l: number, r: number): boolean {
    return this.collection[l] > this.collection[r]
  }

  swap(l: number, r: number): void {
    [this.collection[l], this.collection[r]] = [this.collection[r], this.collection[l]]
  }
}