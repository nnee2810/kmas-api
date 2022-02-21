import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common"
import * as cheer from "cheerio"
import * as qs from "query-string"
import { KMA_API } from "src/configs/network"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { ILessons } from "./interfaces/ILessons"
import { getLessons } from "./utils/getLessons"

@Injectable()
export class LessonsService {
  async getLessons({
    studentCode,
    password,
  }: GetLessonsDto): Promise<ILessons> {
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

      if (userFullName === "Khách" || errorInfo)
        throw new UnauthorizedException()

      const fullName = userFullName.split("(")[0],
        lessons = await getLessons()
      return {
        profile: {
          fullName,
          studentCode,
        },
        lessons,
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
