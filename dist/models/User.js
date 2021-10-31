"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    studentCode: String,
    schedule: String,
});
const User = (0, mongoose_1.model)("users", user);
exports.default = User;
//# sourceMappingURL=User.js.map