"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = (0, express_1.default)();
//Routes
const userRoute_1 = __importDefault(require("./userRoute"));
const transactionRoute_1 = __importDefault(require("./transactionRoute"));
const categoryRoute_1 = __importDefault(require("./categoryRoute"));
routes.use("/api/users", userRoute_1.default);
routes.use("/api/transaction", transactionRoute_1.default);
routes.use("/api/category", categoryRoute_1.default);
routes.get("/", (req, res) => {
    res.send("API Working!");
});
exports.default = routes;
