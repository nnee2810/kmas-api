import * as cheer from "cheerio"
import * as qs from "query-string"
import API from "../configs/network"
import parseExcel from "../utils/parseExcel"
import parseHiddenInput from "../utils/parseHiddenInput"

export default async function getSchedule() {
  try {
    const res = (await API.get("/Reports/Form/StudentTimeTable.aspx")).data
    const $ = cheer.load(res)

    const formData = qs.stringify({
      drpSemester: $("#drpSemester").val(),
      drpTerm: $("#drpTerm").val(),
      drpType: "B",
      btnView: "Xuất file Excel",
      ...parseHiddenInput($),
    })

    const file = (
      await API.post("/Reports/Form/StudentTimeTable.aspx", formData, {
        responseType: "arraybuffer",
      })
    ).data

    return Promise.resolve(parseExcel(file))
  } catch (err) {
    return Promise.reject(err)
  }
}
