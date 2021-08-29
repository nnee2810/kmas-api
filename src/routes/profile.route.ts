import { Router } from "express"
import { profileGet } from "../controllers/profile.controller"

const profileRoute = Router()

profileRoute.get("/", profileGet)

export default profileRoute
