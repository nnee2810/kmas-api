"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseHiddenInput($) {
    const result = {};
    const hiddenInputs = $("form").find("input[type='hidden']");
    hiddenInputs.each((i, e) => (result[$(e).attr("name")] = $(e).val()));
    return result;
}
exports.default = parseHiddenInput;
//# sourceMappingURL=parseHiddenInput.js.map