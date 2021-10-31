"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose = require("mongoose");
function connectDB() {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Connected db"))
        .catch((err) => {
        console.log(err);
        process.exit();
    });
}
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map