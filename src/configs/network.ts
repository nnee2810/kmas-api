import axios from "axios"
import axiosCookieJarSupport from "axios-cookiejar-support"
import * as tough from "tough-cookie"

const API = axios.create({
  baseURL: process.env.HOST_KMA,
  withCredentials: true,
})

axiosCookieJarSupport(API)
API.defaults.jar = new tough.CookieJar()

export default API
