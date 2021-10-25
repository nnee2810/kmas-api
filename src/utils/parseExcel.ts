import * as moment from "moment"
import xlsx from "node-xlsx"

function getRangeRow(sheet: any) {
  const startRowIdx = sheet.findIndex((item: any) => item[0] === "Thứ") + 1
  for (let i = startRowIdx; i < sheet.length; i++) {
    if (!sheet[i][0]) {
      return {
        startRowIdx,
        endRowIdx: i - 1,
      }
    }
  }
}
function getAllDate(rangeDate: any, day: any) {
  let result = []
  let [startDate, endDate] = rangeDate
    .split("-")
    .map((item) => item.split("/").reverse().join("-"))
  let timeLine = moment(startDate)
    .add(day - 2, "d")
    .unix()
  endDate = moment(endDate).unix()
  while (timeLine <= endDate) {
    result.push(moment(timeLine * 1000).toISOString())
    timeLine += 7 * 24 * 60 * 60
  }
  return result
}

export default function parseExcel(file: ArrayBuffer) {
  let schedule = []
  const sheet = xlsx.parse(file)[0].data
  const { startRowIdx, endRowIdx } = getRangeRow(sheet)

  for (let i = startRowIdx; i < endRowIdx; i++) {
    getAllDate(String(sheet[i][10]), sheet[i][0]).forEach((e) => {
      schedule.push({
        subjectCode: sheet[i][1],
        subjectName: sheet[i][3],
        class: sheet[i][4],
        teacher: sheet[i][7],
        lessons: String(sheet[i][8]).split(","),
        room: sheet[i][9],
        date: e,
      })
    })
  }
  return schedule
}
