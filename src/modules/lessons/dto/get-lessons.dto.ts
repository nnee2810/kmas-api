import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class GetLessonsDto {
  @ApiProperty({
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  studentCode: string

  @ApiProperty()
  @IsString()
  password: string
}
