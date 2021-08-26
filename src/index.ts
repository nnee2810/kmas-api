import * as cors from "cors"
import * as express from "express"

const app = express()
app.use(cors())

app.get("/", (req, res) => res.json("Hi"))

app.listen(5000, () => console.log("Server is running"))
