"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const loginRoute = (0, express_1.Router)();
loginRoute.post("/", login_controller_1.postLogin);
exports.default = loginRoute;
//# sourceMappingURL=login.route.js.map