import { model, Schema } from "mongoose"

const user = new Schema({
  studentCode: String,
  schedule: String,
})

const User = model("users", user)
export default User
