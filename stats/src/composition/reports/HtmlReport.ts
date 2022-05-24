import fs from 'fs'
import { OutputTarget } from '../Summary'

export default class implements OutputTarget {
  print(report: string): void {
    fs.writeFileSync('report.html', `<h1>${report}</h1>`)
  }
}