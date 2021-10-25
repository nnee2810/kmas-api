import * as cheer from "cheerio"
import * as qs from "query-string"
import API from "../configs/network"
import { HTTP_UNAUTHORIZED } from "../defines/common"
import parseUserFullName from "../utils/parseUserFullName"
import getSchedule from "./getSchedule"

const loginHost = async ({ studentCode, password }) => {
  const formData = qs.stringify({
    txtUserName: studentCode,
    txtPassword: password,
    btnSubmit: "Đăng nhập",
    __EVENTTARGET: "",
  })
  try {
    const res = await API.post("/Login.aspx", formData)

    const $ = cheer.load(res.data)
    const userFullName = $("#PageHeader1_lblUserFullName").text(),
      errorInfo = $("#lblErrorInfo").text()

    if (userFullName === "Khách" || errorInfo)
      return Promise.reject(HTTP_UNAUTHORIZED)
    else {
      const fullName = parseUserFullName(userFullName)
      const schedule = await getSchedule()
      return Promise.resolve({ fullName, schedule })
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
export default loginHost
