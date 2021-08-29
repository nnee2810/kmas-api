import { Request, Response } from "express"
import { HTTP_OK, HTTP_UNAUTHORIZED } from "../defines/common"
import profile from "../test/profile"
import generateToken from "../utils/generateToken"

function postLogin(req: Request, res: Response) {
  const { username, password } = req.body
  if (username && password) {
    const token = generateToken(username)

    return res.json({
      status: HTTP_OK,
      message: "sign in successfully",
      data: { token, profile },
    })
  }
  return res.json({
    status: HTTP_UNAUTHORIZED,
    message: "invalid username or password",
  })
}

export { postLogin }
