import express from "express";

const router = express.Router();

// Controllers
import { login, getUserById } from "../controllers/UserController";

// Middlewares
import { validateDataSchema } from "../middlewares/validate";

// Schemas
import { userSchema } from "../schemas/userSchema";

// Routes

router.post("/login", validateDataSchema(userSchema), login)
router.get("/:googleId", getUserById)

export default router;