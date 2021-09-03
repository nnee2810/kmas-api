import { sign } from "jsonwebtoken"

function generateToken(payload: object): string {
  const token = sign(payload, process.env.SECRET_KEY, {
    expiresIn: 7 * 24 * 60 * 60,
  })
  return token
}

export default generateToken
