# TypeScript 学习笔记

> 参考教程：https://www.bilibili.com/video/BV1yL4y1F7Qg

## Type Annotation

类型注释，即使用 `: type` 的语法对一个变量进行类型的限定。

```typescript
const myName: string = 'hello'
const myAge: number = 10
const date: Date = new Date()
class Color {}
const c: Color = new Color()
const add: (a: number, b: number) => number = (a: number, b: number): number => {
  return a + b
}
```



## Type Inference

类型推断，即当变量未进行类型注释而直接初始化时，会根据赋值的类型对变量进行类型限定。

```typescript
const myName = 'hello'
const myAge = 10
const date = new Date()
class Color {}
const c = new Color()
const add = (a: number, b: number): number => {
  return a + b
}
```

通常情况下，应当优先考虑使用类型推断，除非遇到以下三种特殊情况，需要使用类型注释进行类型限制。

1. 当值的类型为 any 时；

   ```typescript
   const json = '{"name": "Tom", "age": 18}'
   // JSON.parse 返回类型为 any，如果不进行类型注释，info 将会是 any 类型
   const info: { name: string; age: number } = JSON.parse(json)
   ```

2. 当声明变量未初始化时；

   ```typescript
   let myName: string // 如果不进行类型注释，myName 将是隐式类型 any
   myName = ''

3. 当变量的类型无法自动推断出来时。

   ```typescript
   const arr = [1, 2, 3]
   let flag: boolean | number = false // 为了之后能够赋予 number，必须加入 number 的类型注释
   arr.forEach((item) => {
     if (item === 2) {
       flag = item
     }
   })
   ```



## void 和 never

- void 表示返回空内容，其可以是 null 或 undefined；

  ```typescript
  const fn1 = (): void => {
    return null
  }
  
  const fn2 = (): void => {
    return undefined
  }
  
  const fn3 = (): void => {
    console.log(1) // 无 return，本质上函数还是返回 undefined
  }
  ```

- never 表示函数永远不会执行完，即永远没有返回值，通常用于函数里抛出错误或者进入死循环。

  ```typescript
  const fn1 = (): never => {
    throw new Error()
  }
  
  const fn2 = (): never => {
    while (true) {
      console.log(1)
    }
  }
  
  const fn3 = (a: number): void => {
    if (a === 1) { // 注意，这种情况下函数有几率返回结果，所以不能使用 never 类型
      throw new Error()
    }
  }
  ```



## 对象类型的解构

```typescript
const info = {
  name: 'Tom',
  gender: 'male',
  age: 18,
}

const sayName = ({ name }: { name: string }): string => {
  return name
}

console.log(sayName(info)) // Tom
```



## Array 和 Tuple

- Array

  ```typescript
  let arr1: number[] // 单类型数组
  arr1.push(1)
  
  let arr2: (number | string)[] // 多类型数组
  arr2.push(1)
  arr2.push('1')
  ```

- Tuple

  元组和数组的结构基本类似，只不过元组里的元素类型和位置固定，不能交换元素的类型。

  ```typescript
  const tuple: [number, string, boolean] = [1, 'Tom', true]
  tuple[0] = 2
  tuple[1] = '2'
  tuple[2] = false
  ```

  但是元组这种结果并不常用，由于其固定的结构，在元组中的某个元素有其特殊的含义，比如约定元组的第一个元素表示性别，第二个元素表示名称。和普通的对象相比，元组更像是用索引代替了对象的键名，这种结构带来的影响就是数据不直观，特别是当数据量庞大时候，显得结构不清晰。

