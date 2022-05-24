import { GradeData, Gender } from '../type'
import { stringToDate } from '../utils'

interface DataReader {
  read(): void
  data: string[][]
}

export default class {
  grades: GradeData[] = [] 

  // 使类满足接口要求
  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read()
    this.grades = this.reader.data.map((row: string[]): GradeData => {
      return [
        parseInt(row[0]),
        row[1],
        row[2] === Gender.male ? 1 : 0,
        stringToDate(row[3]),
        parseInt(row[4])
      ]
    })
  }
}