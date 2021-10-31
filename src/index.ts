import * as cors from "cors"
import { config } from "dotenv"
import * as express from "express"
import { HOST } from "./defines/common"
import loginRoute from "./routes/login.route"

config()
//connectDB()

const app = express()
app.use(
  cors({
    origin: ["http://localhost:3000", HOST],
  })
)
app.use(express.json())
app.use("/login", loginRoute)

app.listen(5000, () => console.log("Server is running on port 5000"))
