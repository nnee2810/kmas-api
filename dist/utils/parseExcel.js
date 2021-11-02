"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const node_xlsx_1 = require("node-xlsx");
const getLessonTime_1 = require("./getLessonTime");
function getRangeRow(sheet) {
    const startRowIdx = sheet.findIndex((item) => item[0] === "Thứ") + 1;
    for (let i = startRowIdx; i < sheet.length; i++) {
        if (!sheet[i][0]) {
            return {
                startRowIdx,
                endRowIdx: i - 1,
            };
        }
    }
}
function getAllDate(rangeDate, day) {
    let result = [];
    let [startDate, endDate] = rangeDate
        .split("-")
        .map((item) => item.split("/").reverse().join("-"));
    let timeLine = moment(startDate)
        .add(day - 2, "d")
        .unix();
    endDate = moment(endDate).unix();
    while (timeLine <= endDate) {
        result.push(moment(timeLine * 1000).toISOString());
        timeLine += 7 * 24 * 60 * 60;
    }
    return result;
}
function getClass(arr) {
    return arr[arr.length - 1].slice(0, -1);
}
function parseExcel(file) {
    let schedule = [];
    const sheet = node_xlsx_1.default.parse(file)[0].data;
    const { startRowIdx, endRowIdx } = getRangeRow(sheet);
    for (let i = startRowIdx; i < endRowIdx; i++) {
        getAllDate(String(sheet[i][10]), sheet[i][0]).forEach((e) => {
            schedule.push(Object.assign({ subjectCode: sheet[i][1], subjectName: sheet[i][3], class: getClass(sheet[i][4].toString().split("(")), teacher: sheet[i][7], room: sheet[i][9] }, (0, getLessonTime_1.default)({ date: e, lessons: sheet[i][8] })));
        });
    }
    return schedule;
}
exports.default = parseExcel;
//# sourceMappingURL=parseExcel.js.map