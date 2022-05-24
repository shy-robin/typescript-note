import Model from "../models/Model"

export default abstract class<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {}

  abstract template(): string

  constructor(public parent: Element, public model: T) {
    this.bindModel()
  }

  regionsMap(): { [key: string]: string } {
    return {}
  }

  // 让子类覆盖这个方法
  eventsMap(): { [key: string]: () => void } {
    return {}
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
  }

  bindEvents(fragment: DocumentFragment): void {
    Object.keys(this.eventsMap).forEach((key: string): void => {
      const [eventName, selector] = key.split(':')
      fragment.querySelectorAll(selector).forEach((ele): void => {
        ele.addEventListener(eventName, this.eventsMap()[key])
      })
    })
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap()

    Object.keys(regionsMap).forEach((key) => {
      const selector = regionsMap[key]
      const element = fragment.querySelector(selector)

      if (element) {
        this.regions[key] = element
      }
    })
  }

  render(): void {
    this.parent.innerHTML = ''
    // 创建元素，注意是创建 template 片段
    const ele = document.createElement('template')
    ele.innerHTML = this.template()
    // 绑定事件
    this.bindEvents(ele.content)
    this.mapRegions(ele.content)
    // 插入元素
    this.parent.append(ele.content)
  }
}