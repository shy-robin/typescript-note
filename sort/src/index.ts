import NumbersCollection from "./NumbersCollection"
import StringCollection from "./StringCollection"
import LinkedList from "./LinkedList"

// const numbersCollection = new NumbersCollection([3, 1, 4, -2, 0])
// numbersCollection.sort()
// console.log(numbersCollection.collection)

// const stringCollection = new StringCollection('dAeCBgF')
// stringCollection.sort()
// console.log(stringCollection.collection)

const linkedList = new LinkedList()
linkedList.add(5)
linkedList.add(-1)
linkedList.add(3)
linkedList.add(2)
linkedList.add(1)
linkedList.sort()
linkedList.print()
