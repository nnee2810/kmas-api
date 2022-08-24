import axios from "axios"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"

export const KMA_URL = wrapper(
  axios.create({
    baseURL: process.env.KMA_URL,
    withCredentials: true,
    jar: new CookieJar(),
  }),
)
