# 项目要点

## 第三方库

- parcel-bundler

1. 安装依赖：
   `npm install --save parcel-bundler`
2. 自动编译文件（包括依赖的 ts 文件）
   `parcel index.html`

- faker

- google.maps

   利用 google 的 Maps Javascript API 启动地图服务，并安装 `@types/googlemaps` 类型声明文件
   **需要绑定银行卡，暂时无法使用**

- BMapGL
  
  1. 添加 script
  2. `npm i @types/bmapgl`

> 生成假数据

## type definition file

> 当导入一些第三方库时，会提示“无法找到其声明文件”，其解决方法可以在 npm 中下载对应的类型声明文件：
  `npm install --save @types/{library name}`
  **学会如何使用类型定义文件去了解一些api的用法**

## 3种 modifier

- public
  - 类、子类、实例均可访问

- protected
  - 仅类和子类可以访问

- private
  - 仅类可以访问

## VsCode 导入第三方包没有自动提示

- 解决方法：`import {} from 'xxx'` 或 `import xxx from 'xxx'`，即 from 前面要有内容，
  否则不会有代码提示

## implements

- implements 用于使一些类实现某个接口的规范

## export default 和 export

- export default 导出的变量不需要加上变量名，且导入时可以自定义任何名称;
- export 导出的变量需要加上特定的名称，且导入时要指定由花括号包裹的该名称。

  ```typescript
  // a.ts
  export default class {
     // ...
  }
  export const color = 'red'

  // b.ts
  import anyName, { color } from './a.ts'
  ```
