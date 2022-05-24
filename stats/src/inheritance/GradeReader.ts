import CsvFileReader from "./CsvFileReader"
import { stringToDate } from '../utils'
import { GradeData, Gender } from '../type'

export default class extends CsvFileReader<GradeData> {
  constructor(fileName: string) {
    super(fileName)
  }

  mapRow(row: string[]): GradeData {
    return [
      parseInt(row[0]),
      row[1],
      row[2] === Gender.male ? 1 : 0,
      stringToDate(row[3]),
      parseInt(row[4])
    ]
  }
}