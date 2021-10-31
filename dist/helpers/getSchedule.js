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
const parseExcel_1 = require("../utils/parseExcel");
const parseHiddenInput_1 = require("../utils/parseHiddenInput");
function getSchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = (yield network_1.default.get("/Reports/Form/StudentTimeTable.aspx")).data;
            const $ = cheer.load(res);
            const formData = qs.stringify(Object.assign({ drpSemester: $("#drpSemester").val(), drpTerm: $("#drpTerm").val(), drpType: "B", btnView: "Xuất file Excel" }, (0, parseHiddenInput_1.default)($)));
            const file = (yield network_1.default.post("/Reports/Form/StudentTimeTable.aspx", formData, {
                responseType: "arraybuffer",
            })).data;
            return Promise.resolve((0, parseExcel_1.default)(file));
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.default = getSchedule;
//# sourceMappingURL=getSchedule.js.map