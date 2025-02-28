"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Controllers
const TransactionController_1 = require("../controllers/TransactionController");
// Middlewares
const validate_1 = require("../middlewares/validate");
// Schema
const transactionSchema_1 = require("../schemas/transactionSchema");
// Routes
routes.post("/create", (0, validate_1.validateDataSchema)(transactionSchema_1.transactionSchema), TransactionController_1.createTransaction);
routes.get("/user/:googleId", TransactionController_1.getUserTransactionsById);
routes.delete("/:_id", TransactionController_1.deleteTransactionById);
routes.patch("/:_id", (0, validate_1.validateDataSchema)(transactionSchema_1.updateTransactionSchema), TransactionController_1.updateTransactionById);
exports.default = routes;
