"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const dotenv_1 = require("dotenv");
const express = require("express");
const login_route_1 = require("./routes/login.route");
(0, dotenv_1.config)();
const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use("/login", login_route_1.default);
app.listen(process.env.PORT || 5000, () => console.log("Server is running on port 5000"));
//# sourceMappingURL=index.js.map