import Sorter from "./Sorter"

class Node {
  next: Node | null = null

  constructor(public value: number) {}
}

export default class extends Sorter {
  head: Node | null = null

  get length(): number {
    if (!this.head) return 0
    let node: Node | null = this.head
    let counter = 0
    while (node) {
      counter += 1
      node = node.next
    }
    return counter
  }

  add(value: number): void {
    if (!this.head) {
      this.head = new Node(value)
      return
    }

    let tail = this.head
    while (tail.next) {
      tail = tail.next
    }

    tail.next = new Node(value)
  }

  at(index: number): Node {
    if (!this.head) {
      throw new Error('Index out of range')
    }
    let counter = 0
    let node: Node | null = this.head
    while (node) {
      if (counter === index) {
        return node
      }
      counter += 1
      node = node.next
    }
    throw new Error('Index out of range')
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    if (leftIndex < 0 || leftIndex > this.length - 1 || rightIndex < 0 || rightIndex > this.length - 1) {
      throw new Error('Index out of range')
    }
    return this.at(leftIndex).value > this.at(rightIndex).value
  }

  
  /**
   * simplify. Just swap the value of node.
   * @param leftIndex 
   * @param rightIndex 
   */
  swap(leftIndex: number, rightIndex: number): void {
    if (leftIndex < 0 || leftIndex > this.length - 1 || rightIndex < 0 || rightIndex > this.length - 1) {
      throw new Error('Index out of range')
    }
    ;[this.at(leftIndex).value, this.at(rightIndex).value] = [this.at(rightIndex).value, this.at(leftIndex).value]
  }

  print(): void {
    if (!this.head) {
      return
    }
    let node: Node | null = this.head
    while (node) {
      console.log(node.value)
      node = node.next
    }
  }
}
