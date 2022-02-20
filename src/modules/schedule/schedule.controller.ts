import { Body, Controller, Post } from "@nestjs/common"
import { GetScheduleDto } from "./dto/get-schedule.dto"
import { ScheduleService } from "./schedule.service"

@Controller("schedule")
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  async getSchedule(@Body() body: GetScheduleDto): Promise<any> {
    return 1
  }
}
