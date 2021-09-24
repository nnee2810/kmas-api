import { HTTP_OK } from "../defines/common"
import profile from "../test/profile"
import generateToken from "../utils/generateToken"

function profileGet(req, res) {
  const { studentCode } = req.body
  const token = generateToken({ studentCode })

  return res.json({
    status: HTTP_OK,
    message: "login successfully",
    data: { token, profile },
  })
}

export { profileGet }
