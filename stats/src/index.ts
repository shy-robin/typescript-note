// import GradeReader from './inheritance/GradeReader'
import CsvFileReader from './composition/CsvFileReader'
import GradeReader from './composition/GradeReader'
import Summary from './composition/Summary'

// inheritance
// const reader = new GradeReader('grade.csv');
// reader.read();
// console.log(reader.data);

// composition
const csvFileReader = new CsvFileReader('grade.csv')
const gradeReader = new GradeReader(csvFileReader)
gradeReader.load()
// console.log(gradeReader.grades)

const summary = Summary.init()
summary.buildAndPrintReport(gradeReader.grades)
