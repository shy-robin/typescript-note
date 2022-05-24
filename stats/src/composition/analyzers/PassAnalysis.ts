import { GradeData } from '../../type'
import { Analyzer } from '../Summary'

export default class implements Analyzer {
  run(grades: GradeData[]): string {
    let passNum = 0
    for (let grade of grades) {
      if (grade[4] >= 60) {
        passNum++
      }
    }
    return `There are ${passNum} students passed.`
  }
}