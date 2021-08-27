import { Request, Response } from "express"
import { sign } from "jsonwebtoken"

function signInPost(req: Request, res: Response) {
  const { username, password } = req.body
  if (username && password) {
    const token = sign({ username }, process.env.SECRET_KEY, {
      expiresIn: 7 * 24 * 60 * 60,
    })

    return res.json({
      status: 200,
      message: "Sign in successfully",
      data: { token },
    })
  }
  return res.json({
    status: 401,
    message: "Invalid username or password",
  })
}

export { signInPost }
