import { Injectable, InternalServerErrorException } from "@nestjs/common"
import * as cheer from "cheerio"
import * as qs from "query-string"
import { KMA_API } from "src/configs/network"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { Student } from "./interfaces/Student"
import { getLessons } from "./utils/getLessons"

@Injectable()
export class LessonsService {
  async getLessonsByCredential({
    studentCode,
    password,
  }: GetLessonsDto): Promise<Student> {
    const formData = qs.stringify({
      txtUserName: studentCode,
      txtPassword: password,
      btnSubmit: "Đăng nhập",
      __EVENTTARGET: "",
    })
    try {
      const $ = cheer.load((await KMA_API.post("/Login.aspx", formData)).data)
      const userFullName = $("#PageHeader1_lblUserFullName").text(),
        errorInfo = $("#lblErrorInfo").text()

      if (userFullName === "Khách" || errorInfo) return
      return await getLessons()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
