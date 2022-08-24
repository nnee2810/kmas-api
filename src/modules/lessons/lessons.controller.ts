import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { Student } from "./interfaces/Student"
import { LessonsService } from "./lessons.service"

@Controller("lessons")
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  async getLessons(@Body() body: GetLessonsDto): Promise<Student> {
    const student = await this.lessonsService.getLessonsByCredential(body)
    if (!student) throw new UnauthorizedException()
    return student
  }
}
