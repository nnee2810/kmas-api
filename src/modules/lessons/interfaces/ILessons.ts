import { ILesson } from "./ILesson"

export interface ILessons {
  profile: {
    studentCode: string
    fullName: string
  }
  lessons: ILesson[]
}
