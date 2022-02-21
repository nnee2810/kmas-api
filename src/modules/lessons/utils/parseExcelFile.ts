import * as moment from "moment"
import xlsx from "node-xlsx"
import { ILesson } from "../interfaces/ILesson"

const time = [
  [
    [7, 0],
    [7, 45],
  ],
  [
    [7, 50],
    [8, 35],
  ],
  [
    [8, 49],
    [9, 25],
  ],
  [
    [9, 35],
    [10, 20],
  ],
  [
    [10, 25],
    [11, 10],
  ],
  [
    [11, 15],
    [12, 0],
  ],
  [
    [12, 30],
    [13, 15],
  ],
  [
    [13, 20],
    [14, 5],
  ],
  [
    [14, 10],
    [14, 55],
  ],
  [
    [15, 5],
    [15, 50],
  ],
  [
    [15, 55],
    [16, 40],
  ],
  [
    [16, 45],
    [17, 30],
  ],
  [
    [18, 0],
    [18, 45],
  ],
  [
    [18, 50],
    [18, 45],
  ],
  [
    [18, 50],
    [19, 45],
  ],
  [
    [19, 50],
    [20, 35],
  ],
]

export default function parseLessonTime({
  date,
  lessons,
}: {
  date: string
  lessons: string
}) {
  const lessonsArr = lessons.split(",").map((item: string) => +item),
    current = moment(date)

  return {
    startAt: current
      .set({
        h: time[lessonsArr[0] - 1][0][0],
        m: time[lessonsArr[0] - 1][0][1],
      })
      .toDate(),
    endAt: current
      .set({
        h: time[lessonsArr[lessonsArr.length - 1] - 1][1][0],
        m: time[lessonsArr[lessonsArr.length - 1] - 1][1][1],
      })
      .toDate(),
  }
}
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
function getAllDate(rangeDate: any, day: any): string[] {
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
function parseClass(arr: string[]) {
  return arr[arr.length - 1].slice(0, -1)
}
export function parseExcelFile(file: ArrayBuffer): ILesson[] {
  let lessons: ILesson[] = []
  const sheet = xlsx.parse(file)[0].data
  const { startRowIdx, endRowIdx } = getRangeRow(sheet)

  for (let i = startRowIdx; i < endRowIdx; i++) {
    getAllDate(String(sheet[i][10]), sheet[i][0]).forEach((e) => {
      lessons.push({
        subjectCode: sheet[i][1],
        subjectName: sheet[i][3],
        class: parseClass(sheet[i][4].toString().split("(")),
        teacher: sheet[i][7],
        room: sheet[i][9],
        ...parseLessonTime({ date: e, lessons: sheet[i][8] as string }),
      })
    })
  }
  return lessons
}
