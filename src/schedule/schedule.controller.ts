import { Body, Controller, Post } from "@nestjs/common"
import { GetScheduleDto } from "./dto/get-schedule.dto"

@Controller("schedule")
export class ScheduleController {
  @Post()
  async getSchedule(@Body() body: GetScheduleDto): Promise<any> {
    return 1
  }
}
