import { Lesson } from "./lesson.interface"

export interface Student {
  profile: {
    studentCode: string
    fullName: string
  }
  lessons: Lesson[]
}
