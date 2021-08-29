type Gender = "MALE" | "FEMALE"

export default interface Profile {
  displayName: string
  studentCode: string
  gender: Gender
  birthday: string
}
