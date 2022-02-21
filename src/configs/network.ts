import axios from "axios"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"

export const KMA_API = wrapper(
  axios.create({
    baseURL: process.env.KMA_API,
    withCredentials: true,
    jar: new CookieJar(),
  }),
)
