import { verify } from "jsonwebtoken"
import { HTTP_UNAUTHORIZED } from "../defines/common"

export default function verifyToken(req, res, next) {
  if (!req.headers.authorization)
    return res.json({
      status: HTTP_UNAUTHORIZED,
      message: "missing token",
    })

  const token = req.headers.authorization.split(" ")[1]
  try {
    const decoded = verify(token, process.env.SECRET_KEY)
    req.body = decoded
  } catch (err) {
    return res.json({
      status: HTTP_UNAUTHORIZED,
      message: "invalid token",
    })
  }

  return next()
}
