import * as cors from "cors"
import { config } from "dotenv"
import * as express from "express"
import loginRoute from "./routes/login.route"

config()

const app = express()
app.use(
  cors({
    origin: "*",
  })
)
app.use(express.json())
app.use("/login", loginRoute)

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
)
