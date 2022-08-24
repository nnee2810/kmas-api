import { InternalServerErrorException } from "@nestjs/common"
import * as cheer from "cheerio"
import * as qs from "query-string"
import { KMA_URL } from "src/configs/network"
import { Student } from "../interfaces/Student"
import { parseExcelFile } from "./parseExcelFile"

export async function getLessons(): Promise<Student> {
  try {
    const $ = cheer.load(
      (await KMA_URL.get("/Reports/Form/StudentTimeTable.aspx")).data,
    )
    const formData = qs.stringify({
      drpSemester: $("#drpSemester").val(),
      drpTerm: $("#drpTerm").val(),
      drpType: "B",
      btnView: "Xuất file Excel",
      ...parseHiddenInput($),
    })

    const file = (
      await KMA_URL.post("/Reports/Form/StudentTimeTable.aspx", formData, {
        responseType: "arraybuffer",
      })
    ).data

    return parseExcelFile(file)
  } catch (error) {
    console.log(error)
    throw new InternalServerErrorException()
  }
}
function parseHiddenInput($: cheer.CheerioAPI) {
  const result = {},
    hiddenInputs = $("form").find("input[type='hidden']")
  hiddenInputs.each((i, e) => {
    result[$(e).attr("name")] = $(e).val()
  })
  return result
}
