import { Injectable, InternalServerErrorException } from "@nestjs/common"
import * as cheer from "cheerio"
import * as qs from "query-string"
import { KMA_API } from "src/configs/api"
import { parseInitialFormData, parseSelector } from "src/utils/parseLoginPage"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { Student } from "./interfaces/student.interface"
import { getLessons } from "./utils/getLessons"

@Injectable()
export class LessonsService {
  async getLessonsByCredential({
    studentCode,
    password,
  }: GetLessonsDto): Promise<Student> {
    try {
      let $ = cheer.load((await KMA_API.get("/Login.aspx")).data)
      const data = qs.stringify({
        ...parseInitialFormData($),
        ...parseSelector($),
        txtUserName: studentCode,
        txtPassword: password,
        btnSubmit: "Đăng nhập",
      })
      $ = cheer.load((await KMA_API.post("/Login.aspx", data)).data)
      const userFullName = $("#PageHeader1_lblUserFullName").text()

      if (userFullName === "Khách" || !userFullName) return
      return await getLessons()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
