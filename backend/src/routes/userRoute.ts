import express from "express";

const router = express.Router();

// Controllers
import { login, getUserById, accessUserFinancialData } from "../controllers/UserController";

// Middlewares
import { validateDataSchema } from "../middlewares/validate";

// Schemas
import { userSchema } from "../schemas/userSchema";

// Routes

router.post("/login", validateDataSchema(userSchema), login)
router.get("/:googleId", getUserById)
router.get("/finance/:googleId", accessUserFinancialData)

export default router;