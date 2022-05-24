import { GradeData } from '../type'
import PassAnalysis from './analyzers/PassAnalysis'
import ConsoleReport from './reports/ConsoleReport'
import HtmlReport from './reports/HtmlReport'


export interface Analyzer {
  run(grades: GradeData[]): string
}

export interface OutputTarget {
  print(report: string): void
}

export default class Summary {
  static init(): Summary {
    return new Summary(
      new PassAnalysis(),
      new ConsoleReport()
    )
  }

  constructor( // composition，将多个类组合到一起
    public analyzer: Analyzer,
    public outputTarget: OutputTarget
  ) {}

  buildAndPrintReport(grades: GradeData[]): void {
    const output = this.analyzer.run(grades)
    this.outputTarget.print(output)
  }
}
