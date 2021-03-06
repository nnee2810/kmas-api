import * as moment from "moment"
import xlsx from "node-xlsx"
import getLessonTime from "./getLessonTime"

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
function getClass(arr: string[]) {
  return arr[arr.length - 1].slice(0, -1)
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
        class: getClass(sheet[i][4].toString().split("(")),
        teacher: sheet[i][7],
        room: sheet[i][9],
        ...getLessonTime({ date: e, lessons: sheet[i][8] as string }),
      })
    })
  }
  return schedule
}
