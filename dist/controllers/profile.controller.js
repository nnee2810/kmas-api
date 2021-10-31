"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileGet = void 0;
const common_1 = require("../defines/common");
const profile_1 = require("../test/profile");
function profileGet(req, res) {
    const { studentCode } = req.body;
    return res.status(common_1.HTTP_OK).json({
        status: common_1.HTTP_OK,
        message: "login successfully",
        data: { profile: profile_1.default },
    });
}
exports.profileGet = profileGet;
//# sourceMappingURL=profile.controller.js.map