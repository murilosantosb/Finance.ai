import express from "express";

const router = express.Router();

// Controllers
import { login, getUserById, getFinanceOfUser } from "../controllers/UserController";

// Middlewares
import { validateDataSchema } from "../middlewares/validate";

// Schemas
import { userSchema } from "../schemas/userSchema";

// Routes

router.post("/login", validateDataSchema(userSchema), login);
router.get("/:googleId", getUserById);
router.get("/finances/:googleId", getFinanceOfUser);

export default router;