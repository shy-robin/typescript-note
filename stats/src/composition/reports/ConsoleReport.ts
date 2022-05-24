import { OutputTarget } from '../Summary'

export default class implements OutputTarget {
  print(report: string): void {
    console.log(report)
  }
}