"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Controllers
const CategoryController_1 = require("../controllers/CategoryController");
// Routes
routes.get("/:googleId", CategoryController_1.getUserIdCategories);
exports.default = routes;
