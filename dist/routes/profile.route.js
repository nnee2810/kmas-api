"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const profileRoute = (0, express_1.Router)();
profileRoute.get("/", profile_controller_1.profileGet);
exports.default = profileRoute;
//# sourceMappingURL=profile.route.js.map