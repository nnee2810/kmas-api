import * as bodyParser from "body-parser"
import * as cors from "cors"
import { config } from "dotenv"
import * as express from "express"
import { HOST } from "./configs/network"
import verifyToken from "./middlewares/verifyToken"
import loginRoute from "./routes/login.route"
import profileRoute from "./routes/profile.route"

config()
const app = express()

app.use(
  cors({
    origin: ["http://localhost:3000", HOST],
  })
)
app.use(bodyParser.json())
app.use("/login", loginRoute)
app.use("/profile", verifyToken, profileRoute)

app.listen(5000, () => console.log("Server is running"))
