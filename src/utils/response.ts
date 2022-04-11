import { HttpStatus } from "@nestjs/common"
import { Response } from "src/interceptors/transform.interceptor"

export function successResponse<T>(data: T): Response<T> {
  return {
    data,
    message: "Success",
    status: HttpStatus.OK,
  }
}
