import express from "express";

const routes = express.Router();


// Controllers
import { createTransaction, getUserTransactionsById, deleteTransactionById, updateTransactionById } from "../controllers/TransactionController";

// Middlewares
import { validateDataSchema } from "../middlewares/validate";

// Schema
import { transactionSchema, updateTransactionSchema } from "../schemas/transactionSchema";


// Routes

routes.post("/create", validateDataSchema(transactionSchema), createTransaction);
routes.get("/user/:googleId", getUserTransactionsById);
routes.delete("/:_id", deleteTransactionById);
routes.patch("/:_id", validateDataSchema(updateTransactionSchema), updateTransactionById);

export default routes;