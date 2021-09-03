import axios from "axios"
import { HOST_KMA } from "../defines/common"

const API = axios.create({
  baseURL: HOST_KMA,
})

export default API
