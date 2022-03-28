import { IsString, MinLength, ValidateIf } from "class-validator"

export class GetLessonsDto {
  @IsString()
  method: "credential" | "excel" | "source"

  @ValidateIf((i) => i.method === "credential")
  @IsString()
  @MinLength(6)
  studentCode?: string

  @ValidateIf((i) => i.method === "credential")
  @IsString()
  password?: string

  @ValidateIf((i) => i.method === "excel")
  excel?: Express.Multer.File
}
