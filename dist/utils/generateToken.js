"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(payload) {
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.SECRET_KEY, {
        expiresIn: 7 * 24 * 60 * 60,
    });
    return token;
}
exports.default = generateToken;
//# sourceMappingURL=generateToken.js.map