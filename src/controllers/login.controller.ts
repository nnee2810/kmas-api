import { Request, Response } from "express"
import {
  HTTP_OK,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_UNAUTHORIZED,
} from "../defines/common"
import loginHost from "../helpers/loginHost"

function postLogin(req: Request, res: Response) {
  const { studentCode, password } = req.body
  if (studentCode.length > 5 && password) {
    loginHost({ studentCode, password })
      .then(({ fullName, schedule }) => {
        return res.status(HTTP_OK).json({
          status: HTTP_OK,
          message: "login successfully",
          data: {
            profile: { studentCode, fullName },
            schedule,
          },
        })
      })
      .catch((err) => {
        if (err === HTTP_UNAUTHORIZED)
          return res.status(HTTP_UNAUTHORIZED).json({
            status: HTTP_UNAUTHORIZED,
            message: "username or password is invalid",
          })
        console.log(err)
        return res.status(HTTP_UNAUTHORIZED).json({
          status: HTTP_SERVICE_UNAVAILABLE,
          message: "service is unavailable",
        })
      })
  } else
    return res.status(HTTP_UNAUTHORIZED).json({
      status: HTTP_UNAUTHORIZED,
      message: "username or password is invalid",
    })
}

export { postLogin }
