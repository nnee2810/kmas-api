"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const tough = require("tough-cookie");
const common_1 = require("../defines/common");
const API = axios_1.default.create({
    baseURL: common_1.HOST_KMA,
    withCredentials: true,
});
(0, axios_cookiejar_support_1.default)(API);
API.defaults.jar = new tough.CookieJar();
exports.default = API;
//# sourceMappingURL=network.js.map