import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { LessonsService } from "./lessons.service"

@ApiTags("lessons")
@Controller("lessons")
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  async getLessons(@Body() body: GetLessonsDto) {
    const student = await this.lessonsService.getLessonsByCredential(body)
    if (!student)
      throw new UnauthorizedException("Tài khoản hoặc mật khẩu không chính xác")
    return student
  }
}
