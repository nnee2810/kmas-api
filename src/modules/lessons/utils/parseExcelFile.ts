import * as moment from "moment"
import xlsx from "node-xlsx"
import { Lesson } from "../interfaces/lesson.interface"
import { Student } from "../interfaces/student.interface"

const shiftTime = [
  [
    ["07", "00"],
    ["09", "25"],
  ],

  [
    ["09", "35"],
    ["12", "00"],
  ],

  [
    ["12", "30"],
    ["14", "55"],
  ],

  [
    ["15", "05"],
    ["17", "30"],
  ],

  [
    ["18", "00"],
    ["20", "35"],
  ],
]

export function parseLessonTime(date: string, shifts: string) {
  const shiftList = shifts.split(",").map((item: string) => +item)
  const [startAt, endAt] = shiftTime[(shiftList[0] - 1) / 3].map((time) =>
    time.join(":"),
  )

  return {
    date: moment(date).toISOString(),
    startAt,
    endAt,
  }
}
function getLessonRows(sheet: unknown[]) {
  const startRowIdx = sheet.findIndex((item: any) => item[0] === "Thứ") + 1
  for (let i = startRowIdx; i < sheet.length; i++) {
    if (!sheet[i][0])
      return {
        startRowIdx,
        endRowIdx: i - 1,
      }
  }
}
function getAllDate(rangeDate: string, day: string): string[] {
  const result: string[] = []
  const [startDate, endDate] = rangeDate
    .split("-")
    .map((item) => item.split("/").reverse().join("-"))
  let timeLine = moment(startDate)
    .add(+day - 2, "d")
    .unix()

  let endTime = moment(endDate).unix()
  while (timeLine <= endTime) {
    result.push(moment(timeLine * 1000).toISOString())
    timeLine += 7 * 24 * 60 * 60
  }
  return result
}
function parseClassName(className: string) {
  return className.split("(")[1].slice(0, -1)
}
export function parseExcelFile(file: ArrayBuffer): Student {
  const sheet = xlsx.parse(file)[0].data
  const { startRowIdx, endRowIdx } = getLessonRows(sheet)

  const lessons: Lesson[] = []
  for (let i = startRowIdx; i <= endRowIdx; i++) {
    getAllDate(String(sheet[i][10]), sheet[i][0]).forEach((date) => {
      lessons.push({
        subjectCode: sheet[i][1],
        subjectName: sheet[i][3],
        className: parseClassName(sheet[i][4] as string),
        teacher: sheet[i][7],
        room: sheet[i][9],
        ...parseLessonTime(date, sheet[i][8] as string),
      })
    })
  }

  return {
    profile: {
      fullName: sheet[5][2],
      studentCode: sheet[5][5],
    },
    lessons,
  }
}
