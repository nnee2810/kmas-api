import { Request, Response } from "express"
import { HTTP_OK, HTTP_SERVICE_UNAVAILABLE, HTTP_UNAUTHORIZED } from "../defines/common"
import loginHost from "../helpers/loginHost"
import generateToken from "../utils/generateToken"

function postLogin(req: Request, res: Response) {
  const { studentCode, password } = req.body
  if (studentCode.length > 5 && password) {
    loginHost({ studentCode, password })
      .then((fullName) => {
        const token = generateToken({ studentCode, fullName })
        return res.json({
          status: HTTP_OK,
          message: "login successfully",
          data: {
            token,
            profile: { studentCode, fullName },
          },
        })
      })
      .catch((err) => {
        if (err === HTTP_UNAUTHORIZED)
          return res.json({
            status: HTTP_UNAUTHORIZED,
            message: "username or password is invalid",
          })
        console.log(err)
        return res.json({
          status: HTTP_SERVICE_UNAVAILABLE,
          message: "service is unavailable",
        })
      })
  } else
    return res.json({
      status: HTTP_UNAUTHORIZED,
      message: "username or password is invalid",
    })
}

export { postLogin }
