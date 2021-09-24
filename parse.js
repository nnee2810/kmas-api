const xlsx = require("node-xlsx")
const fs = require("fs")
const moment = require("moment")

function getRangeRow(sheet) {
  const startRowIdx = sheet.findIndex((item) => item[0] === "Thứ") + 1
  for (let i = startRowIdx; i < sheet.length; i++) {
    if (!sheet[i][0]) {
      return {
        startRowIdx,
        endRowIdx: i - 1,
      }
    }
  }
}
function getAllDate(rangeDate, day) {
  const [startDate, endDate] = rangeDate
    .split("-")
    .map((item) => item.split("/").reverse().join("/"))
  console.log(moment(new Date(startDate)))
}

function parseExcel(file) {
  const data = []
  const sheet = xlsx.parse(file)[0].data
  const { startRowIdx, endRowIdx } = getRangeRow(sheet)

  for (let i = startRowIdx; i < endRowIdx; i++) {
    data.push({
      subjectCode: sheet[i][1],
      subjectName: sheet[i][3],
      class: sheet[i][4],
      teacher: sheet[i][7],
      lessons: String(sheet[i][8]).split(","),
      room: sheet[i][9],
      date: getAllDate(String(sheet[i][10]), sheet[i][0]),
    })
  }
}
const file = fs.readFileSync("./excel")
parseExcel(file)
