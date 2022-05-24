import fs from 'fs'

export default abstract class<T> {
  data: T[] = []
  
  constructor(public fileName: string) {}

  // 承诺子类会提供该方法
  abstract mapRow(row: string[]): T

  read(): void {
    this.data = fs.readFileSync(this.fileName, {
      encoding: 'utf-8'
    })
    .split('\n')
    .map((row: string): string[] => row.split(','))
    .map(this.mapRow)
  }
}