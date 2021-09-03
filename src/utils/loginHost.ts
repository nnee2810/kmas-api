import * as cheerio from "cheerio"
import * as qs from "query-string"
import API from "../configs/network"
import { HTTP_NOT_FOUND, HTTP_UNAUTHORIZED } from "../defines/common"

const loginHost = async ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    const formData = qs.stringify({
      txtUserName: username,
      txtPassword: password,
      btnSubmit: "Đăng nhập",
      __EVENTTARGET: "",
    })
    try {
      const data = (await API.post("/Login.aspx", formData)).data
      const $ = cheerio.load(data)
      const userFullName = $("#PageHeader1_lblUserFullName").text().toLowerCase()

      if (userFullName === "khách") reject(HTTP_UNAUTHORIZED)
      else resolve(1)
    } catch (err) {
      reject(HTTP_NOT_FOUND)
    }
  })
export default loginHost
