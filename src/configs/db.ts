import * as mongoose from "mongoose"

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected db"))
    .catch((err) => {
      console.log(err)
      process.exit()
    })
}
export { connectDB }
