"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = void 0;
const common_1 = require("../defines/common");
const loginHost_1 = require("../helpers/loginHost");
function postLogin(req, res) {
    const { studentCode, password } = req.body;
    if (studentCode.length > 5 && password) {
        (0, loginHost_1.default)({ studentCode, password })
            .then(({ fullName, schedule }) => {
            return res.status(common_1.HTTP_OK).json({
                status: common_1.HTTP_OK,
                message: "login successfully",
                data: {
                    profile: { studentCode, fullName },
                    schedule,
                },
            });
        })
            .catch((err) => {
            if (err === common_1.HTTP_UNAUTHORIZED)
                return res.status(common_1.HTTP_UNAUTHORIZED).json({
                    status: common_1.HTTP_UNAUTHORIZED,
                    message: "username or password is invalid",
                });
            console.log(err);
            return res.status(common_1.HTTP_UNAUTHORIZED).json({
                status: common_1.HTTP_SERVICE_UNAVAILABLE,
                message: "service is unavailable",
            });
        });
    }
    else
        return res.status(common_1.HTTP_UNAUTHORIZED).json({
            status: common_1.HTTP_UNAUTHORIZED,
            message: "username or password is invalid",
        });
}
exports.postLogin = postLogin;
//# sourceMappingURL=login.controller.js.map