import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { excelFileFilter } from "src/utils/excelFileFilter"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { Student } from "./interfaces/Student"
import { LessonsService } from "./lessons.service"
import { parseExcelFile } from "./utils/parseExcelFile"

@Controller("lessons")
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("excel", {
      fileFilter: excelFileFilter,
    }),
  )
  async getLessons(
    @Body() body: GetLessonsDto,
    @UploadedFile() excel: Express.Multer.File,
  ): Promise<Student> {
    let data: Student

    switch (body.method) {
      case "credential": {
        data = await this.lessonsService.getLessonsByCredential(body)
        break
      }
      case "excel": {
        data = parseExcelFile(excel.buffer)
        break
      }
    }

    if (!data) throw new UnauthorizedException()
    return data
  }
}
