"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controllers
const UserController_1 = require("../controllers/UserController");
// Middlewares
const validate_1 = require("../middlewares/validate");
// Schemas
const userSchema_1 = require("../schemas/userSchema");
// Routes
router.post("/login", (0, validate_1.validateDataSchema)(userSchema_1.userSchema), UserController_1.login);
router.get("/:googleId", UserController_1.getUserById);
router.get("/finances/:googleId", UserController_1.getFinanceOfUser);
exports.default = router;
