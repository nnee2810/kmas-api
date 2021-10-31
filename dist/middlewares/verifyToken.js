"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const common_1 = require("../defines/common");
function verifyToken(req, res, next) {
    if (!req.headers.authorization)
        return res.json({
            status: common_1.HTTP_UNAUTHORIZED,
            message: "missing token",
        });
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
        req.body = Object.assign(Object.assign({}, req.body), { decoded });
    }
    catch (err) {
        return res.json({
            status: common_1.HTTP_UNAUTHORIZED,
            message: "invalid token",
        });
    }
    return next();
}
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map