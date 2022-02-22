import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common"
import { Response, successResponse } from "src/utils/response"
import { GetLessonsDto } from "./dto/get-lessons.dto"
import { ILessons } from "./interfaces/ILessons"
import { LessonsService } from "./lessons.service"

@Controller("lessons")
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  async getLessons(@Body() body: GetLessonsDto): Promise<Response<ILessons>> {
    const data = await this.lessonsService.getLessons(body)
    if (!data) throw new UnauthorizedException()
    return successResponse(data)
  }
}
