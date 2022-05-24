# SORT

## setup

- `tsc --init`
  - 生成 `tsconfig.json` 配置文件，主要配置项目根目录和输出目录，即 `rootDir` 和 `outDir`

- `tsc`
  - 根据配置文件，自动运行编译 typescript

- `tsc -w`
  - 监视文件的变化，一旦文件改变，自动重新编译

- `npm i nodemon concurrently`
  - nodemon 负责启动 nodejs 服务，自动运行 js 文件
  - concurrently 负责同时执行多个脚本命令

```json
  "scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon ./build/index.js",
    "start": "concurrently npm:start:*"
  },
```

其中，`npm:start:*` 表示运行所有 npm 中的 scripts 里以 `start:` 开头的命令。

## bad approach

- 对于多种类型的集合，如数字集合、字符串、链表等，采用 `type guard` 的方式进行类型判断，然后写对应的逻辑，
  这种通过 `instanceof` 或者 `typeof` 方法进行类型判断的方式，会使后面的代码变得十分冗余。

## good approach

- 创建一个 `Sorter` 类，其接收固定类型的参数，该参数满足特定的接口，如传入的参数必须包含 `length`、`compare`、`swap` 这些属性或方法。

## Abstract Class

- 一个抽象类具有如下特点：
  1. 不能用作创建实例
  2. 只能当为一个父类，被子类继承
  3. 可以包含一些实现的方法
  4. 这些实现的方法可以调用抽象类本身不存在的其他属性或方法（仍然需要为没有实现的方法提供名称和类型）
  5. 抽象类可以承诺子类会提供一些额外的属性或方法以实现抽象类中的方法（避免因在抽象类中找不到对应属性和方法而报错）

## interface versus abstract class

- interfaces
  
- inheritance / abstract classes
