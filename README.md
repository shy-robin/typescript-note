> 参考教程：
>
> - https://www.bilibili.com/video/BV1Xy4y1v7S2
> - https://juejin.cn/post/7018805943710253086
> - https://juejin.cn/post/6844904182843965453
>
> 练习网站：
>
> - https://www.typescriptlang.org/zh/play

# TypeScript 学习笔记



## 〇、简介

**TypeScript 是什么？**

- TypeScript 是以 JavaScript 为基础构建的语言，它是 JavaScript 的超集；
- TypeScript 扩展了 JavaScript，并添加了类型；
- TypeScript 可以在任何支持 JavaScript 的平台中执行，但它不能被直接被 JavaScript 解析器直接执行，而需要通过编译器将 TS 代码转换成 JS 代码；
- TS 完全兼容 JS，换言之，任何的 JS 代码都可以直接当成 TS 使用；
- 相较于 JS 而言，TS 拥有了静态类型，更加严格的语法，更强大的功能；
- TS 可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；
- TS 代码可以编译为任意版本的 JS代码，可有效解决不同 JS 运行环境的兼容问题；
- 同样的功能，TS 的代码量要大于 JS，但由于 TS 的代码结构更加清晰，变量类型更加明确，在后期代码的维护中 TS 却远远胜于 JS。

**TypeScript 增加了什么？**

- 类型
- 添加 ES 不具备的新特性
- 支持 ES 的新特性
- 丰富的配置选项
- 强大的开发工具，如开发工具的代码提示离不开 ts

**环境搭建**

1. 下载 Node.js 

   - 64位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   - 32位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi
2. 安装 Node.js
3. 使用 npm 全局安装 typescript

   - 进入命令行
   - 输入：`npm i -g typescript`
4. 创建一个ts文件
5. 使用 tsc 对 ts 文件进行编译

   - 进入命令行
- 进入ts 文件所在目录
   - 执行命令：`tsc xxx.ts`



## 一、快速入门

### 1.1 基本类型

- 类型声明 (Type Annotation)

  - 类型声明是 TS 非常重要的一个特点；

  - 通过类型声明可以指定 TS 中变量（参数、形参）的类型；

  - 指定类型后，当为变量赋值时，TS 编译器会自动检查值是否符合类型声明，符合则赋值，否则报错；

  - 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值；

  - 语法：

    ```typescript
    let 变量: 类型;
      
    let 变量: 类型 = 值;
      
    function fn(参数: 类型, 参数: 类型): 类型 {
          ...
    }
    ```

- 自动类型判断 (Type Inference)

  - TS 拥有自动的类型判断机制；

  - 当对变量的声明和赋值是同时进行的，TS 编译器会自动判断变量的类型；

  - 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明；

  - ```typescript
    let msg = 'hello' // msg 被自动判别为 String 类型
    
    msg = 123 // error: 不能将类型“number”分配给类型“string”。
    ```

- 最佳实践：

  - 一般情况下，推荐优先使用 **类型推断**，除非遇到以下三种特殊情况选用 **类型声明**：

    1. 当变量类型为 `any`

       ```typescript
       const json = '{"x": 20, "y": 20}'
       const coordinates = JSON.parse(json) // JSON.parse() 返回的结果类型为 any
       
       // 在 typescript 中应到避免使用 any，所以这种情况要使用类型声明为变量添加特定类型
       const coordinates: { x: number; y: number } = JSON.parse(json) // Object literal
       ```

    2. 当变量延迟初始化时

       ```typescript
       let name // 若变量声明时为初始化，则类型为 any
       
       // 为避免这种情况，应当使用类型声明添加特定类型
       let name: string
       
       name = 'Tom'
       ```

    3. 当类型推断不能正常工作时

       ```typescript
       const arr = [1, 2, 10]
       const flag = false // 此时，flag 被推断为 boolean 类型
       
       arr.forEach((item) => {
           if (item === 1) {
               flag = item // 由于 item 为 number 类型，不能赋值给 flag，会报错
           }
       })
       
       // 为避免这种情况，应当使用类型声明添加特定类型
       const arr = [1, 2, 10]
       const flag = false | number
       
       arr.forEach((item) => {
           if (item === 1) {
               flag = item
           }
       })
       ```

       

- 类型：

  |   类型    |           例子           |              描述              |
  | :-------: | :----------------------: | :----------------------------: |
  |  number   |       1, -33, 2.5        |            任意数字            |
  |  string   |     'hi', "hi", `hi`     |           任意字符串           |
  |  boolean  |       true、false        |       布尔值true或false        |
  |  字面量   |          其本身          |  限制变量的值就是该字面量的值  |
  |    any    |            *             |            任意类型            |
  |  unknown  |            *             |         类型安全的any          |
  |   void    | 空值（undefined / null） |     没有值（或undefined）      |
  |   never   |          没有值          |          不能是任何值          |
  |  object   |     {name:'孙悟空'}      |          任意的JS对象          |
  |   array   |         [1,2,3]          |           任意JS数组           |
  |   tuple   |          [4,5]           | 元素，TS新增类型，固定长度数组 |
  |   enum    |        enum{A, B}        |       枚举，TS中新增类型       |
  |   null    |           null           |              空值              |
  | undefined |        undefined         |             未定义             |

  

#### 1.1.1 number

  ```typescript
  let decimal: number = 6;
  let hex: number = 0xf00d;
  let binary: number = 0b1010;
  let octal: number = 0o744;
  let big: bigint = 100n;
  ```



#### 1.1.2 boolean

  ```typescript
  let isDone: boolean = false;
  ```



#### 1.1.3 string

  ```typescript
  let color: string = "blue";
  color = 'red';
  
  let fullName: string = `Bob Bobbington`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${fullName}.
  
    I'll be ${age + 1} years old next month.`;
  ```



#### 1.1.4 null / undefined

  ```typescript
  // null 和 undefined 通常结合联合类型一起使用
  let name: string | null | undefined
  ```



#### 1.1.5 object（不常用）

  ```typescript
  // 在 JS 中，数组、函数等都是对象，所以 object 限制的范围很广，一般不常用
  let a: object
  a = {}
  a = []
  a = function() {}
  
  // 一般会采用以下方式限制
  // 1. 限制对象
  let obj1: { name: string, age: number } // 固定属性
  obj1 = { name: 'Amy', age: 18 }
  let obj2: { name: string, age?: number } // 可选属性
  obj2 = { name: 'Jack' }
  let obj3: { name: string, [propName: string]: any } // 任意属性
  obj3 = { name: 'John', gender: 'male', age: 22 }
  
  // 2. 限制函数
  let fn: (a: number, b: number) => number // 限制形参和返回结果的类型
  fn = (a: number, b: number): number => a + b
  ```



#### 1.1.6 array

  ```typescript
  // 数字数组
  let list: number[] = [1, 2, 3] // 写法一
  let list: Array<number> = [1, 2, 3] // 写法二【泛型语法】
  // 字符串数组
  let list: string[] = ['1', '2']
  let list: Array<string> = ['1', '2']
  ```



#### 1.1.7 tuple

  ```typescript
  // tuple 元组，即固定长度的数组
  let x: [string, number]
  x = ["hello", 10]
  ```



#### 1.1.8 enum

  ```typescript
  // enum 枚举，即将所有可能的值列出来，便于判断
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green
  
  enum Color {
    Red = 1, // 自定义值，一般没必要
    Green,
    Blue,
  }
  let c: Color = Color.Green
  
  enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
  }
  let c: Color = Color.Green
  ```



#### 1.1.9 any

  ```typescript
  // 显式 any
  let d: any = 4;
  d = 'hello';
  d = true;
  // 隐式 any（不指定类型且不赋值则默认指定为 any 类型）
  let e
  e = 123
  e = false
  // 注意：any 类型的数据可以赋值给任意类型的变量，因此【应当避免使用 any】
  let str: string = 'hello'
  s = d
  // typescript 允许对 any 类型的变量执行任何操作
  let value: any
  any.fn.hello // OK
  new value.xxx.yyy() // OK
  ```



#### 1.1.10 unknown

  ```typescript
  // unknown：类型位置，变量可以接收任意类型的值
  let a: unknown = 4;
  a = 'hello';
  
  // 与 any 不同的是：【unknown 类型的数据只可以赋值给 any 或 unknown 类型的数据】
  let str: string = 'hello';
  str = a; // error: 不能将类型“unknown”分配给类型“string”
  let x: any = a // OK
  let y: unknown = a // OK
  
  // 与 any 不同，unknown 类型的数据不支持做任意操作【会检查是否存在对应属性或方法】
  a.xxx.yyy // Error
  new a.xxx() // Error
  
  // 要消除上面的报错，可以通过以下三种方式解决
  // 1. 类型守卫（通过类型判断给 str 赋值）
  if (typeof a === 'string') {
    str = a
  }
  // 2. 类型断言（以下两种写法都可以）
  str = a as string // 当 a 为 string 类型时，赋值给 str
  str = <string>a
  ```



#### 1.1.11 void

  ```typescript
  // void 表示空，即不设置值或者设置 null 或 undefined
  let a: void = undefined;
  a = null;
  function fn(): void {
    console.log('hello world') // 没有返回值，即返回 undefined
  }
  
  // 当函数不指定返回类型且返回了某种类型的值时，则该函数默认返回类型为该值类型
  function fn1() { // function fn1(): boolean
    return true
  }
  function fn2() { // function fn2(): boolean | 1
    if (1) {
      return 1
    } else {
      return false
    }
  }
  
  // 当函数不指定返回类型且没有返回值时，则该函数默认返回类型为 void
  function fn3() { // function fn3(): void
    console.log(111)
  }
  ```



#### 1.1.12 never

  ```typescript
  // never 表示不能有任何返回值，即必须存在无法到达的终点【死循环或抛出异常】
  function fn1(): never {
    return null // error
  }
  function fn2(): never {
    return undefined // error
  }
  function fn3(): never {
    console.log(111) // error（没有返回值即返回 undefined，而 never 不允许有任何返回值）
  }
  
  function error(message: string): never {
    console.log(111)
    throw new Error(message) // 此时程序抛出错误，不会有任何返回值
  }
  
  function loop(): never {
      while(true) {} // 此时程序存在死循环，不会有任何返回值
  }
  ```

  never 的应用：假如写了这样一段代码：

  ```typescript
  const fn = (value: number | string) => {
    if (typeof value === 'number') {
      //
    } else if (typeof value === 'string') {
      //
    } else {
      // 
    }
  }
  
  fn(1) // OK
  fn('xxx') // OK
  fn(true) // Error：类型“boolean”的参数不能赋给类型“string | number”的参数。
  ```

  上例中，value 本身有类型限制，只能接收 number 和 string 类型。

  但是，如果某天不小心改掉了 value 的类型：

  ```typescript
  const fn = (value: number | string | boolean) => {
    if (typeof value === 'number') {
      //
    } else if (typeof value === 'string') {
      //
    } else {
      //
    }
  }
  
  fn(1) // OK
  fn('xxx') // OK
  fn(true) // OK
  ```

  这样，三种类型都验证通过了，但你并不知情，此时就可以借助 never 预防这种情况：

  ```typescript
  const fn = (value: number | string | boolean) => {
    if (typeof value === 'number') {
      //
    } else if (typeof value === 'string') {
      //
    } else {
      const check: never = value // Error: 不能将类型“boolean”分配给类型“never”。
    }
  }
  ```

  此时，可以发现一旦开发者修改了 value 的类型，ts 就会检查到错误，开发者就能够知道类型的修改。

  因此，**使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。**



### 1.2 类型断言

有些情况下，变量的类型对于我们来说是很明确，但是 TS 编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型（只在编译阶段起作用），断言有两种形式：

- 第一种【as 语法】

  ```typescript
  let val: unknown = "hello world!"
  let len: number = val.length // error：val 类型不确定，所以编译器无法确定其是否有 length 属性。
  
  let someValue: unknown = "this is a string"
  let strLength: number = (someValue as string).length // 告诉编译器 someValue 的类型就是 string
  ```

- 第二种【尖括号语法】

  ```typescript
  let someValue: unknown = "this is a string"
  let strLength: number = (<string>someValue).length
  ```



### 1.3 联合类型

```typescript
let a: 1 | 2 | 3 | undefined // 联合类型允许一个变量接收不同类型的数据
a = 1 // OK
a = undefined // OK
```



### 1.4 交叉类型

  ```typescript
  interface a {
    name: string
    gender: string
  }
  
  interface b {
    age: number
    id: number
  }
  
  type c = a & b // 交叉类型会将多个类型限制合并成一个
  
  let info: c = {
    name: 'Tom',
    age: 18,
    gender: 'male',
    id: 1
  }
  ```



### 1.5 类型别名

  ```typescript
  type myType = 1 | 2 | 3 | 4 | 5 // 类型别名
  let a: myType
  let b: myType
  a = 2
  b = 5
  ```



### 1.6 函数

#### 1.6.1 函数写法

和 ES6 一样，在 TypeScript 中，函数的写法有两种方式：

**1. 函数声明式**

```typescript
function fn(name: string, age: number): string {
    return 'xxx'
}
```

**2. 匿名函数式**

```typescript
const fn = (name: string, age: number): void => {
    console.log(111)
}
```



#### 1.6.2 函数类型

```typescript
let fn1: (a: string, b: number) => boolean // 指定函数的参数类型和返回类型

function fn2(name: string, age: number): boolean {
  return false
}

fn1 = fn2 // 赋值【只有符合 fn1 规定的函数类型才能成功赋值】
```



#### 1.6.3 可选参数

使用 `?:` 表示该参数可选。（需要注意的是可选参数要放在普通参数的后面，不然会导致编译错误。）

```typescript
function fn(name: string, age?: number): number {
  return 111
}

fn('Tom')
```



#### 1.6.4 默认参数

给参数设置默认值，如果调用函数时不传参则使用默认值。

```typescript
function fn(name: string, age: number = 18): number {
  return 111
}

fn('Tom')
```



#### 1.6.5 剩余参数

使用 ES6 中的扩展运算符将之后的剩余参数导入。

```typescript
function fn(name: string, ...args: number[]): number {
  console.log(args) // [ 1, 2, 3 ]
  
  return 111
}

fn('Tom', 1, 2, 3)
```



#### 1.6.6 函数重载

先来看一个例子：

```typescript
type Combinable = string | number

function add(a: Combinable, b: Combinable) {
  // 1. 如果 a、b 至少有一个为 string
  if (typeof a === 'string' || typeof b === 'string') {
   return a.toString() + b.toString() // 返回 string
  }
  // 2. 如果 a、b 都为 number
  return a + b // 返回 number

  // 综上，该函数返回类型为 string | number
}

const result = add('Semlinker', ' Kakuqo')
result.split(' ') // error：类型“string | number”上不存在属性“split”。
```

> **函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。** 要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

```typescript
type Combinable = string | number

// 把可能发生的多种情况列举出来
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string

function add(a: Combinable, b: Combinable) {
  // 1. a、b 至少有一个为 string
  if (typeof a === 'string' || typeof b === 'string') {
   return a.toString() + b.toString() // 返回 string
  }
  // 2. a、b 都为 number
  return a + b // 返回 number

  // 综上，该函数返回类型为 string | number
}

const result = add('Semlinker', ' Kakuqo')
result.split(' ') // OK
add(1, 2) // OK
add(1, 'number') // OK
add('number', 2) // OK
```





## 二、编译打包

### 2.1 编译选项

- 自动编译文件

  - 编译文件时，使用 `-w (watch)` 指令后，TS 编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

  - 示例：

    ```powershell
    tsc xxx.ts -w
    ```

- 自动编译整个项目

  - 如果直接使用 `tsc` 指令，则可以自动将当前项目下的所有 ts 文件编译为 js 文件；
  - 但是能直接使用 tsc 命令的前提时，要先在项目根目录下创建一个 ts 的配置文件 `tsconfig.json`；
  - `tsconfig.json` 是一个 JSON 文件，添加配置文件后，只需只需 `tsc` 命令即可完成对整个项目的编译；




#### 2.1.1 tsconfig.json介绍

tsconfig.json 是 TypeScript 项目的配置文件。如果一个目录下存在一个 tsconfig.json 文件，那么往往意味着这个目录就是 TypeScript 项目的根目录。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。



#### 2.1.2 tsconfig.json重要字段

- `files` - 设置要编译的文件的名称；
- `include` - 设置需要进行编译的文件，支持路径模式匹配；
- `exclude` - 设置无需进行编译的文件，支持路径模式匹配；
- `compilerOptions` - 设置与编译流程相关的选项。



#### 2.1.3 compilerOptions选项

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```




  - 配置选项：

    - `include`

      - 定义希望被编译文件所在的目录；

      - 默认值：`["**/*"]`（`**` 表示任意目录，`*` 表示任意文件）；

      - 示例：
    
        ```json
        "include": ["src/**/*", "tests/**/*"]
        ```

        上述示例中，所有 src 目录和 tests 目录下的文件都会被编译。

    - `exclude`

      - 定义需要排除在外的目录；

      - 默认值：`["node_modules", "bower_components", "jspm_packages"]`

      - 示例：
    
        ```json
        "exclude": ["./src/hello/**/*"]
        ```

        上述示例中，src 下 hello 目录下的所有文件都不会被编译。

    - `extends`

      - 定义被继承的配置文件，即将其他 json 文件的配置信息合并到当前文件；

      - 示例：
    
        ```json
        "extends": "./configs/base"
        ```

        上述示例中，当前配置文件中会自动包含 configs 目录下 base.json 中的所有配置信息。

    - `files`

      - 指定被编译文件的列表（类似于 include），只有需要编译的文件少时才会用到；

      - 示例：
    
        ```json
        "files": [
          "core.ts",
          "sys.ts",
          "types.ts",
          "scanner.ts",
          "parser.ts",
          "utilities.ts",
          "binder.ts",
          "checker.ts",
          "tsc.ts"
        ]
        ```

        上述示例中，列表中的文件都会被 TS 编译器所编译。

    - `compilerOptions`
    
        - 编译器选项是配置文件中非常重要也比较复杂的配置选项；
        
        - 在 compilerOptions 中包含多个子选项，用来完成对编译的配置；
        
          - `target`
        
            - 设置 ts 代码编译的目标版本；
        
            - 可选值：
        
              - es3（默认）、es5、es6/es2015、es7/es2016、es2017、es2018、es2019、es2020、esnext；
        
            - 示例：
        
              ```json
              "compilerOptions": {
                "target": "es6"
              }
              ```
          
              如上设置，我们所编写的 ts 代码将会被编译为 ES6 版本的 js 代码。
        
          - `lib`
        
            - 指定代码运行时所包含的库（宿主环境），例如项目中需要使用到 `document`，则需要指定 `dom` 库；
        
            - lib 也有默认值，前端项目一般不修改此项；
        
            - 可选值：
        
              - es5、es6/es2015、es7/es2016、es2017、es2018、es2019、es2020、esnext、dom、webworker、scripthost ......
        
            - 示例：
        
              ```json
              "compilerOptions": {
                "target": "ES6",
                "lib": ["ES6", "DOM"],
                "outDir": "dist",
                "outFile": "dist/aa.js"
              }
              ```
        
          - `module`
        
            - 设置编译后代码使用的模块化规范；
        
            - 可选值：
        
              - none、commonjs、umd、amd、system、es6、es2015、es2020、esnext；
        
            - 示例：
        
              ```json
              "compilerOptions": {
                "module": "CommonJS"
              }
              ```
        
          - `outDir`
        
            - 用于指定编译后文件的所在目录；
        
            - 默认情况下，编译后的 js 文件会和 ts 文件位于相同的目录，设置 outDir 后可以改变编译后文件的位置；
        
            - 示例：
        
              ```json
              "compilerOptions": {
                "outDir": "./dist"
              }
              ```
        
              设置后编译后的js文件将会生成到 dist 目录。
        
          - `outFile`
        
            - 将所有编译后的文件合并为一个 js 文件；
        
            - 默认会将所有的编写在全局作用域中的代码合并为一个 js 文件，如果 module 制定了 none、system 或 amd 则会将模块一起合并到文件之中；
        
            - 一般此项不常用，通常使用打包工具将代码合并；
        
            - 示例：
          
              ```json
              "compilerOptions": {
                "outFile": "./dist/app.js"
              }
              ```
        
          - `rootDir`
        
            - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过 rootDir 可以手动指定根目录；
        
            - 示例：
          
              ```json
              "compilerOptions": {
                "rootDir": "./src"
              }
              ```
        
          - `allowJs`
        
            - 是否对 js 文件进行编译，默认为 false。
        
          - `checkJs`
        
            - 是否用 ts 的规范对 js 文件进行检查，默认为 false；
        
            - 示例：
          
              ```json
              "compilerOptions": {
                "allowJs": true,
                "checkJs": true
              }
              ```
        
          - `removeComments`
          
            - 是否删除注释，默认为 false。
          
          - `noEmit`
          
            - 不生成编译后的文件，只执行编译过程，通常用于只借助 ts 的语法检查的场景；
            - 默认为 false。
          
          - `noEmitOnError`
          
            - 当程序出错时不生成编译后的文件，默认为 false。
          
          - `sourceMap`
          
            - 是否生成 sourceMap，默认为 false。
        
          - `strict`
          
            - 相当于所有严格检查的总开关，默认值为true，即默认开启所有的严格检查。
          
          - `alwaysStrict`
          
            - 总是以严格模式对代码进行编译。
          
          - `noImplicitAny`
          
            - 禁止隐式的 any 类型。
            
          - `noImplicitThis`
          
            - 禁止类型不明确的 this。
            
          - `strictBindCallApply`
          
            - 严格检查 bind、call 和 apply 的参数列表。
            
          - `strictFunctionTypes`
            
            - 严格检查函数的类型。
            
          - `strictNullChecks`
            
            - 严格的空值检查。
            
          - `strictPropertyInitialization`
            
            - 严格检查属性是否初始化。
            
          - 额外检查
          
            - `noFallthroughCasesInSwitch`
              - 检查 switch 语句是否包含正确的 break。
            - `noImplicitReturns`
              - 检查函数是否没有隐式的返回值。
            - `noUnusedLocals`
              - 检查是否存在未使用的局部变量。
            - `noUnusedParameters`
              - 检查是否存在未使用的参数。
            
          - 高级
          
            - `allowUnreachableCode`
              - 检查不可达代码；
              - 可选值：
                - true：忽略不可达代码；
                - false：不可达代码将引起错误。
            - `noEmitOnError`
              - 有错误的情况下不进行编译；
              - 默认值：false。



### 2.2 Webpack

- 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS 同样也可以结合构建工具一起使用，下边以webpack 为例介绍一下如何结合构建工具使用 TS。

- 步骤：

  1. 初始化项目

     - 进入项目根目录，执行命令 ``` npm init -y```
       - 主要作用：创建 `package.json` 文件

  2. 下载构建工具

     - ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```
       - 共安装了 7 个包
         - `webpack`
           - 构建工具 webpack
         - `webpack-cli`
           - webpack 的命令行工具
         - `webpack-dev-server`
           - webpack 的开发服务器
         - `typescript`
           - ts 编译器
         - `ts-loader`
           - ts 加载器，用于在 webpack 中编译 ts 文件
         - `html-webpack-plugin`
           - webpack 中 html 插件，用来自动创建 html 文件
         - `clean-webpack-plugin`
           - webpack 中的清除插件，每次构建都会先清除目录

  3. 根目录下创建 webpack 的配置文件 `webpack.config.js`

     ```javascript
     const path = require("path");
     const HtmlWebpackPlugin = require("html-webpack-plugin");
     const { CleanWebpackPlugin } = require("clean-webpack-plugin");
       
     module.exports = {
       optimization:{
         minimize: false // 关闭代码压缩，可选
       },
       
       entry: "./src/index.ts",
           
       devtool: "inline-source-map",
           
       devServer: {
         contentBase: './dist'
       },
       
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "bundle.js",
         environment: {
           arrowFunction: false // 关闭webpack的箭头函数，可选
         }
       },
       
       resolve: {
         extensions: [".ts", ".js"]
       },
           
       module: {
         rules: [
           {
             test: /\.ts$/,
             use: {
               loader: "ts-loader"     
             },
             exclude: /node_modules/
           }
         ]
       },
       
       plugins: [
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
           title:'TS测试'
         }),
       ]
     }
     ```
     
4. 根目录下创建tsconfig.json，配置可以根据自己需要
  
   ```json
   {
     "compilerOptions": {
       "target": "ES2015",
       "module": "ES2015",
       "strict": true
     }
   }
   ```
  
5. 修改package.json添加如下配置
  
   ```json
   {
     // ...略...
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack",
       "start": "webpack serve --open chrome.exe"
     },
     // ...略...
   }
   ```
  
6. 在 src 下创建 ts 文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器。
  
   

### 2.3 Babel

- 经过一系列的配置，使得 TS 和 webpack 已经结合到了一起，除了 webpack，开发中还经常需要结合 babel 来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将 babel 引入到项目中。

  1. 安装依赖包：

     - ```npm i -D @babel/core @babel/preset-env babel-loader core-js```
     - 共安装了4个包，分别是：
       - `@babel/core`
         - babel 的核心工具
       - `@babel/preset-env`
         - babel 的预定义环境
       - `@babel-loader`
         - babel 在 webpack 中的加载器
       - `core-js`
         - core-js 用来使老版本的浏览器支持新版 ES 语法

  2. 修改 `webpack.config.js` 配置文件

     ```javascript
     // ...略...
     module: {
       rules: [
         {
           test: /\.ts$/,
           use: [
             {
               loader: "babel-loader",
               options: {
                 presets: [
                   [
                     "@babel/preset-env",
                     {
                       "targets": {
                         "chrome": "58",
                         "ie": "11"
                       },
                       "corejs":"3",
                       "useBuiltIns": "usage"
                     }
                   ]
                 ]
               }
             },
             {
               loader: "ts-loader",
             }
           ],
           exclude: /node_modules/
         }
       ]
     }
     // ...略...
     ```
  
- 如此一来，使用 ts 编译后的文件将会再次被 babel 处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的 targets 中指定要兼容的浏览器版本。





## 三、面向对象

### 3.0 简介

面向对象是程序中一个非常重要的思想，简而言之就是程序之中所有的操作都需要通过对象来完成。

- 举例来说：
  - 操作浏览器要使用 window 对象
  - 操作网页要使用 document 对象
  - 操作控制台要使用 console 对象

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为`属性`，而功能就被称为`方法`。所以简而言之，在程序中一切皆是对象。



### 3.1 类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说：可以通过 Person 类来创建人的对象，通过 Dog 类创建狗的对象，通过 Car 类来创建汽车的对象，不同的类可以用来创建不同的对象。

定义并使用类：

  ```typescript
  class Person {
    // 声明实例属性（供实例调用）
    name: string
    readonly age: number // 只读实例属性
  
    // 声明并定义静态属性（供类调用）
    static className: string = 'Person'
  
    // 构造函数
    constructor(name: string, age: number) {
      // 在实例方法或者静态方法中，this 指向实例
      this.name = name
      this.age = age
    }
  
    // 实例方法（供实例调用）
    sayHello() {
      console.log(`Hello, I am ${this.name}.`)
    }
  
    // 静态方法（供类调用）
    static sayClassName() {
      console.log(`ClassName is ${this.className}.`)
    }
  }
  
  const person = new Person('Jack', 18)
  console.log(person.name) // Jack
  console.log(person.age) // 18
  console.log(Person.className) // Person
  person.sayHello() // Hello, I am Jack.
  Person.sayClassName() // ClassName is Person.
  
  ```



### 3.2 面向对象的特点

#### 3.2.1 封装

- 对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装；

- 默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在 TS 中可以对属性的权限进行设置；

**只读属性（readonly）**

> 如果在声明属性时添加一个 readonly，则属性便成了只读属性无法修改；

```typescript
class Person {
  readonly name: string
}

const person = new Person()
person.name = 123 // error: 无法分配到 "name" ，因为它是只读属性
```

**TS 中属性具有三种修饰符**

1. public（默认值），表示属性可以在类、子类和实例对象中访问和修改；

  ```typescript
  class Person {
    public name: string // 属性默认为 public
    public age: number
  
    constructor(name: string, age: number) {
      this.name = name // 1. 属性可以在类中修改
      this.age = age
    }
  }
  
  class Man extends Person{
    constructor(name: string, age: number){
      super(name, age)
      this.name = name // 2. 属性可以在子类中修改
    }
  }
  
  const p = new Person('Tom', 18)
  p.name = 'Tommy' // 3. 属性可以通过实例对象修改
  ```

2. protected ，表示属性可以在类、子类中访问和修改；

  ```typescript
  class Person {
    protected name: string
    protected age: number
  
    constructor(name: string, age: number) {
      this.name = name // 1. 属性可以在类中修改
      this.age = age
    }
  }
  
  class Man extends Person{
    constructor(name: string, age: number){
      super(name, age)
      this.name = name // 2. 属性可以在子类中修改
    }
  }
  
  const p = new Person('Tom', 18)
  // p.name = 'Tommy' // error: 属性不可以通过实例对象修改
  ```

3. private ，表示属性只可以在类中访问和修改。

  ```typescript
  class Person {
    private name: string
    private age: number
  
    constructor(name: string, age: number) {
      this.name = name // 1. 属性可以在类中修改
      this.age = age
    }
  }
  
  class Man extends Person{
    constructor(name: string, age: number){
      super(name, age)
      // this.name = name // error: 属性不可以在子类中修改
    }
  }
  
  const p = new Person('Tom', 18)
  // p.name = 'Tommy' // error: 属性不可以通过实例对象修改
  ```

**属性存取器**

- 对于一些不希望被任意修改的属性，可以将其设置为 `private`；

- 但是直接将其设置为 `private` 将导致无法再通过对象修改其中的属性；

- 我们可以在类中向外暴露一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器；

- 读取属性的方法叫做 `getter` 方法，设置属性的方法叫做 `setter` 方法；

  1. 可以自己手写 `getter` 和 `setter` 方法：

     ```typescript
     class Person {
       private name: string
     
       constructor(name: string) {
         this.name = name
       }
       // 定义 getter
       getName() {
         return this.name
       }
       // 定义 setter
       setName(newName: string) {
         this.name = newName
       }
     }
     
     const p = new Person('Tom')
     // p.name = 'Tommy' // error: 私有属性不可以通过实例对象修改
     console.log(p.getName())
     p.setName('Tommy')
     ```

  2. 也可以利用 TypeScript 的 `get` 和 `set` 实现：

     ```typescript
     class Person {
       name: string
       private _age: number
     
       constructor(name: string, age: number) {
         this.name = name
         this._age = age
       }
       // 定义 getter
       get age() {
         return this._age
       }
       // 定义 setter
       set age(newAge: number) {
         if (newAge >= 0) {
           this._age = newAge
         }
       }
     }
     
     const p = new Person('Tom', 18)
     console.log(p.age) // 18
     p.age = 22
     console.log(p.age) // 22
     p.age = -10
     console.log(p.age) // 22
     ```

     > 使用这种方法的好处是：可以直接通过指定的变量名访问或修改私有变量，而不用新增方法。

**语法糖**

```typescript
class Person {
  name: string
  private age: number
  
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

// 这种写法和上面写法作用相同
class Person {
  constructor(public name: string, private age: number) {
    this.name = name
    this.age = age
  }
}
```

**静态属性**

- 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用；

- 静态属性（方法）使用 `static` 开头；

- ```typescript
  class Tools{
      static PI = 3.1415926
      
      static sum(num1: number, num2: number){
          return num1 + num2
      }
  }
  
  console.log(Tools.PI)
  console.log(Tools.sum(123, 456))
  ```

**this**

在类中，使用 `this` 表示当前对象。



#### 3.2.2 继承

- 继承是面向对象中的又一个特性；

- 通过继承可以将其他类中的属性和方法引入到当前类中，从而实现在不修改类的情况下完成对类的扩展（遵循 OCP -- Open Close Protocol 原则【开放封闭原则，对扩展开放，对修改封闭】）；

  ```typescript
  class Animal {
    name: string
    age: number
  
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  
    sayHello(): void {
      console.log('Hello, I am Animal.')
    }
  }
  
  class Dog extends Animal {
    // 如果子类实例方法和父类实例方法不重名，则会新增实例方法
    run(): void {
      console.log('I am running...')
    }
  }
  
  // 由于子类 Dog 没有重写 constructor，所以会继承父类 Animal 的 constructor
  const dog = new Dog('Black', 3)
  dog.sayHello()
  ```

  **方法重写**

  > 发生继承时，如果子类中的方法会替换掉父类中的同名方法，这就称为方法的重写。

  ```typescript
  class Animal {
    name: string
    age: number
  
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  
    sayHello(): void {
      console.log('Hello, I am Animal.')
    }
  }
  
  class Dog extends Animal {
    gender: string
  
    // 子类重写了 constructor
    constructor(name: string, age: number, gender: string) {
      super(name, age) // 此时必须调用 super 函数以初始化父类的数据
      this.gender = gender
    }
    // 如果子类实例方法和父类实例方法重名，则会重写父类实例方法
    sayHello(): void {
      super.sayHello() // 这里的 super 相当于父类的实例
      console.log('Hello, I am a dog.')
    }
    // 如果子类实例方法和父类实例方法不重名，则会新增实例方法
    run(): void {
      console.log('I am running...')
    }
  }
  
  const dog = new Dog('Black', 3, 'male')
  dog.sayHello()
  ```

  *在子类中可以使用 super 来完成对父类的引用。*

  **抽象类（abstract class）**

  > 抽象类是专门用来被其他类所继承的类，它只能用于被其他类所继承而不能用来创建实例。

  ```typescript
  // 抽象类，作为其他类的父类，不能被实例化
  abstract class Animal {
    name: string
    age: number
  
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  
    // 抽象方法，其没有函数体， 子类必须重写该方法
    abstract sayHello(): void
  }
  
  class Dog extends Animal {
    sayHello(): void {
      console.log('hello')
    }
  }
  ```

  *使用 abstract 开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，子类继承抽象类时必须要重写该抽象方法。*



#### 3.2.3 多态

通俗的讲，就是同一个东西表现出多种状态，在面向对象的描述中就是同一个函数接口，实现多种不同的表现方式。



### 3.3 接口（Interface）

- 接口的作用类似于抽象类，不同点在于接口中的所有属性和方法都是没有实值的，换句话说接口中的所有方法都是抽象方法；

  ```typescript
  interface myInterface {
    // 声明属性，但不能赋值
    name: string
    age: number
  
    // 声明方法，但不能有函数体
    sayHello(): void
  }
  ```

- (1) 接口可以限制一个对象（对象只有包含接口中定义的所有属性和方法时才能匹配接口，同时接口也可以当成类型声明去使用）：

  ```typescript
  type myType = {
    name: string,
    age: number
  }
  let person: myType
  person = { name: 'Jack', age: 18 }
  
  interface myInterface {
    // 声明属性，但不能赋值
    name: string
    age: number
  
    // 声明方法，但不能有函数体
    sayHello(): void
  }
  let animal: myInterface
  animal = { // 对象中只有包含接口中定义的所有属性和方法时才能匹配接口，类似于类型声明的别名
    name: 'dog',
    age: 3,
    sayHello() {
      console.log('hello')
    }
  }
  ```

- (2) 接口也可以限制一个类（实现接口就是使类满足接口的要求）：

  ```typescript
  interface myInterface {
    // 声明属性，但不能赋值
    name: string
    age: number
  
    // 声明方法，但不能有函数体
    sayHello(): void
  }
  
  class Animal implements myInterface {
    // 实现该接口，即需要满足接口内规定的所有属性和方法
    name: string;
    age: number;
    sayHello(): void {
      console.log('hello')
    }
  }
  ```



### 3.4 泛型（Generic）

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

泛型类似于函数中传入的参数，在不确定具体类型时，可以定义一个泛型，让用户选择传入类型。

#### 3.4.1 函数中使用泛型

举个例子：

```typescript
function test(arg: any): any {
  return arg
}
```

上例中，test 函数有一个参数类型不确定，但是能确定的是其返回值的类型和传入参数的类型是相同的，由于类型不确定所以参数和返回值均使用了 any，但是很明显这样做是不合适的，首先使用 any 会关闭 TS 的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型。

此时，我们可以使用泛型：

```typescript
function test<T>(arg: T): T {
  return arg
}
```

这里的```<T>```就是泛型，T 是我们给这个类型起的名字（不一定非叫 T ），设置泛型后即可在函数中使用 T 来表示该类型。所以泛型其实很好理解，就表示某个类型。

那么如何使用上边的函数呢？

- 方式一（直接使用）：

  ```typescript
  test(10)
  ```

  > 使用时可以直接传递参数使用，类型会由 TS 自动推断出来（TS 自动判断 T 的类型为 number），但有时编译器无法自动推断时还需要使用下面的方式。

- 方式二（指定类型）：

  ```typescript
  test<number>(10)
  ```

  > 在函数后手动指定泛型，表示 T 的类型就是 number。

可以同时指定多个泛型，泛型间使用逗号隔开：

  ```typescript
  function test<T, K>(a: T, b: K): K {
    return b
  }
  
  test<number, string>(10, "hello")
  ```



#### 3.4.2 类中使用泛型

使用泛型时，完全可以将泛型当成是一个普通的类去使用，类中同样可以使用泛型：

```typescript
class MyClass<T> {
  prop: T

  constructor(prop: T) {
    this.prop = prop
  }
}
```



#### 3.4.2 接口中使用泛型

除此之外，也可以对泛型的范围进行约束：

```typescript
interface MyInter {
  length: number
}
  
function test<T extends MyInter>(arg: T): number { // 泛型约束，表示 T 泛型必须包含 length 属性
  return arg.length
}

test({ name: 'demo', length: 12 }) // ok
```

使用 `T extends MyInter` （`Generic Constraint` 泛型约束）表示泛型 T 必须是 MyInter 的子类，注意这里的 MyInter 可以是接口类，也可以是其他类。



### 3.5 装饰器

装饰器是一种特殊类型的声明，它能够被添加到类声明、方法、属性或参数上，可以修改类的行为。

通俗的讲，装饰器就是一个方法，可以注入到类、方法、属性或参数上来扩展类、属性、方法或参数。

装饰器只会执行一次，当创建类的实例时，不会再次执行。

常见的装饰器有：`类装饰器`、`属性装饰器`、`方法装饰器`、`参数装饰器`。

装饰器是过去几年中 JavaScript 最大成就之一，已经是 ES7 的标准特性之一。

装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）。

#### 3.5.1 类装饰器

1. 普通装饰器（无法传参）

   ```typescript
   function add(target: Person) {
       console.log(target === Person) // true, 这里的 target 就是 Person 这个类
       Person.prototype.name = 'Tom' // 向类中添加属性
       Person.prototype.sayHello = () => { // 向类中添加方法
           console.log('Hello Wrold!')
       }
   }
   
   @add // 这里可以看成 add(Person)
   class Person {
   }
   
   const person = new Person()
   console.log(person.name) // Tom
   person.sayHello() // Hello World!
   ```

2. 装饰器工厂（可以传参）

   ```typescript
   function add(greeting: string) {
       return function(target: Person) {
           Person.prototype.name = 'Tom'
           Person.prototype.sayHello = () => {
               console.log('Hello Wrold!')
           }
           Person.prototype.greet = () => {
               console.log(greeting)
           }
       }
   }
   
   @add('Good Morning!') // 这里可以看成 add('Good Morning!')(Person)
   class Person {
   }
   
   const person = new Person()
   console.log(person.name) // Tom
   person.sayHello() // Hello World!
   person.greet() // Good Morning!
   ```

利用类装饰器重载类的构造函数：

```typescript
function add(target: Person) {
    return class extends target {
        name: string = 'Jack' // 重载类的属性
        getName() { // 重载类的方法
            console.log(`=== ${this.name} ===`)
        }
    }
}

@add
class Person {
    name: string = 'Tom'
    getName() {
        console.log(this.name)
    }
}

const person = new Person()
person.getName() // === Jack ===
```



#### 3.5.2 属性装饰器

```typescript
function onPublicProperty(newName: string) {
    return function(target: any, key: string) {
        console.log(target === Person.prototype) // true，pulic 属性的 target 为类的原型对象
        console.log(key) // "name"
    }
}

function onStaticProperty(newAge: number) {
    return function(target: any, key: string) {
        console.log(target === Person) // true，static 属性的 target 为类本身（构造函数）
        console.log(key) // "age"
        console.log(target[key]) // 18
    }
}

class Person {
    @onPublicProperty('Jack')
    name: string = 'Tom'
    
    @onStaticProperty(22)
    static age: number = 18
    
    getName() {
        console.log(this.name)
    }
}

const person = new Person()
```



#### 3.5.3 方法装饰器

```typescript
function onPulicMethod(newName: string) {
    return function(target: any, key: string, desc: any) {
        console.log(target === Person.prototype) // true，pulic 方法的 target 为类的原型对象
        console.log(key) // "getName"
        console.log(desc.value) // getName 函数
    }
}

function onStaticMethod(newName: number) {
    return function(target: unknown, key: unknown, desc: any) {
        console.log(target === Person) // true，static 方法的 target 为类本身（构造函数）
        console.log(key) // "getAge"
        console.log(desc.value) // getAge 函数
    }
}

class Person {
    name: string = 'Tom'
    age: number = 18

    @onPulicMethod('Jack')
    getName() {
        console.log(this.name)
    }

    @onStaticMethod(22)
    static getAge() {
        console.log(this.age)
    }
}

const person = new Person()
```



#### 3.5.4 参数装饰器

```typescript
function onPulicParams(target: unknown, key: string, index: number) {
    console.log(target === Person.prototype) // true，pulic 方法的 target 为类的原型对象
    console.log(key) // "getName"
    console.log(index) // 0
}

function onStaticParams(target: unknown, key: string, index: number) {
    console.log(target === Person) // true，static 方法的 target 为类本身（构造函数）
    console.log(key) // "getAge"
    console.log(index) // 0
}

class Person {
    name: string = 'Tom'
    age: number = 18

    getName(@onPulicParams name: string, age: number) {
        console.log(this.name)
    }

    static getAge(@onStaticParams name: string, age: number) {
        console.log(this.age)
    }
}

const person = new Person()
```



### 3.6 命名空间

> 命名空间，防止变量命名冲突。

```typescript
namespace A {
    export class Animal {
        name: string = 'animal'
    }
}

namespace B {
    export class Animal {
        name: string = 'animal'
    }
}

const a = new A.Animal()
const b = new B.Animal()
```

```typescript
// module.ts
export namespace A {
    export class Animal {
        name: string = 'animal'
    }
}

export namespace B {
    export class Animal {
        name: string = 'animal'
    }
}

// main.ts
import { A, B } from './module.ts'
const a = new A.Animal()
const b = new B.Animal()
```

