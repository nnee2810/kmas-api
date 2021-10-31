"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheer = require("cheerio");
const qs = require("query-string");
const network_1 = require("../configs/network");
const common_1 = require("../defines/common");
const parseUserFullName_1 = require("../utils/parseUserFullName");
const getSchedule_1 = require("./getSchedule");
const loginHost = ({ studentCode, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = qs.stringify({
        txtUserName: studentCode,
        txtPassword: password,
        btnSubmit: "Đăng nhập",
        __EVENTTARGET: "",
    });
    try {
        const res = yield network_1.default.post("/Login.aspx", formData);
        const $ = cheer.load(res.data);
        const userFullName = $("#PageHeader1_lblUserFullName").text(), errorInfo = $("#lblErrorInfo").text();
        if (userFullName === "Khách" || errorInfo)
            return Promise.reject(common_1.HTTP_UNAUTHORIZED);
        else {
            const fullName = (0, parseUserFullName_1.default)(userFullName);
            const schedule = yield (0, getSchedule_1.default)();
            return Promise.resolve({ fullName, schedule });
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.default = loginHost;
//# sourceMappingURL=loginHost.js.map