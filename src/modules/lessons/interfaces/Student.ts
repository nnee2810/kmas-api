import { Lesson } from "./Lesson"

export interface Student {
  profile: {
    studentCode: string
    fullName: string
  }
  lessons: Lesson[]
}
