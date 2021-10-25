import { HTTP_OK } from "../defines/common"
import profile from "../test/profile"

function profileGet(req, res) {
  const { studentCode } = req.body

  return res.status(HTTP_OK).json({
    status: HTTP_OK,
    message: "login successfully",
    data: { profile },
  })
}

export { profileGet }
