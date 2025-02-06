import express from "express";

const routes = express.Router();


// Controllers
import { createTransaction, getUserTransactionsById } from "../controllers/TransactionController";

// Middlewares
import { validateDataSchema } from "../middlewares/validate";

// Schema
import { transactionSchema } from "../schemas/transactionSchema";


// Routes

routes.post("/create", validateDataSchema(transactionSchema), createTransaction);
routes.get("/user/:googleId", getUserTransactionsById);


export default routes;