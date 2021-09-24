import axios from "axios"
import axiosCookieJarSupport from "axios-cookiejar-support"
import * as tough from "tough-cookie"
import { HOST_KMA } from "../defines/common"

const API = axios.create({
  baseURL: HOST_KMA,
  withCredentials: true,
})

axiosCookieJarSupport(API)
API.defaults.jar = new tough.CookieJar()

export default API
