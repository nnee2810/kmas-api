import { IsString, MinLength } from "class-validator"

export class GetLessonsDto {
  @IsString()
  @MinLength(6)
  studentCode: string

  @IsString()
  password: string
}
