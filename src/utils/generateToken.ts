import { sign } from "jsonwebtoken"

function generateToken(username: string): string {
  const token = sign({ username }, process.env.SECRET_KEY, {
    expiresIn: 7 * 24 * 60 * 60,
  })
  return token
}

export default generateToken
