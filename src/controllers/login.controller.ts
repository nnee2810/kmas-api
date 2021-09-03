import { Request, Response } from "express"
import { HTTP_NOT_FOUND, HTTP_OK, HTTP_UNAUTHORIZED } from "../defines/common"
import profile from "../test/profile"
import generateToken from "../utils/generateToken"
import loginHost from "../utils/loginHost"

function postLogin(req: Request, res: Response) {
  const { username, password } = req.body
  if (username && password) {
    loginHost({ username, password })
      .then(() => {
        const token = generateToken({ username })
        res.json({
          status: HTTP_OK,
          message: "login successfully",
          data: {
            token,
            profile,
          },
        })
      })
      .catch((err) => {
        switch (err) {
          case HTTP_UNAUTHORIZED: {
            res.json({
              status: HTTP_UNAUTHORIZED,
              message: "username or password is incorrect",
            })
            break
          }
          case HTTP_NOT_FOUND: {
            res.json({
              status: HTTP_NOT_FOUND,
              message: "kma not working",
            })
            break
          }
          default:
            break
        }
      })
  } else
    res.json({
      status: HTTP_UNAUTHORIZED,
      message: "username or password is invalid",
    })
}

export { postLogin }
