import * as bodyParser from "body-parser"
import * as cors from "cors"
import { config } from "dotenv"
import * as express from "express"
import signInRoute from "./routes/signIn.route"

config()
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/signin", signInRoute)

app.listen(5000, () => console.log("Server is running"))
