import express from "express";

const routes = express.Router();

// Controllers
import { getUserIdCategories } from "../controllers/CategoryController";

// Routes
routes.get("/:googleId", getUserIdCategories);

export default routes;