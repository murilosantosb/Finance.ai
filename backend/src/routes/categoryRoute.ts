import express from "express";

const routes = express.Router();

// Controllers
import { getUserIdCategories } from "../controllers/CategoryController";

// Middlewares


// Routes
routes.get("/:googleId", getUserIdCategories);

export default routes;