import { HTTP_OK } from "../defines/common"
import profile from "../test/profile"
import generateToken from "../utils/generateToken"

function profileGet(req, res) {
  const { username } = req.body
  const token = generateToken({ username })

  return res.json({
    status: HTTP_OK,
    message: "login successfully",
    data: { token, profile },
  })
}

export { profileGet }
