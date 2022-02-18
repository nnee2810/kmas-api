import * as cors from "cors"
import * as express from "express"
import loginRoute from "./routes/login.route"

const app = express()
app.use(
  cors({
    origin: "*",
  })
)
app.use(express.json())
app.use("/login", loginRoute)

app.listen(process.env.PORT, () =>
  console.log("Server is running on port", process.env.PORT)
)
