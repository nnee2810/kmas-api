import { HttpStatus } from "@nestjs/common"

export class Response<T> {
  data?: T
  message: string
  statusCode: number
}
export function successResponse<T>(
  data?: T,
  message: string = "Success",
): Response<T> {
  return {
    data,
    message,
    statusCode: HttpStatus.OK,
  }
}
export function notFoundResponse<T>(
  message: string = "Not found",
): Response<T> {
  return {
    message,
    statusCode: HttpStatus.NOT_FOUND,
  }
}
export function errorResponse<T>(message: string = "Bad request"): Response<T> {
  return {
    message,
    statusCode: HttpStatus.BAD_REQUEST,
  }
}
