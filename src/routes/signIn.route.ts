import { Router } from "express"
import { signInPost } from "../controllers/signIn.controller"

const signInRoute = Router()

signInRoute.post("/", signInPost)

export default signInRoute
