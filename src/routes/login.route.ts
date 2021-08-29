import { Router } from "express"
import { postLogin } from "../controllers/login.controller"

const loginRoute = Router()

loginRoute.post("/", postLogin)

export default loginRoute
