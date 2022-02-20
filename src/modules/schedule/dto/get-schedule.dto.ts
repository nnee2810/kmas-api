import { IsString, MinLength } from "class-validator"

export class GetScheduleDto {
  @IsString()
  @MinLength(6)
  studentCode: string

  @IsString()
  password: string
}
