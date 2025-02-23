import express from "express";

const routes = express.Router();


// Controllers
import { createTransaction, getUserTransactionsById, deleteTransactionById } from "../controllers/TransactionController";

// Middlewares
import { validateDataSchema } from "../middlewares/validate";

// Schema
import { transactionSchema } from "../schemas/transactionSchema";


// Routes

routes.post("/create", validateDataSchema(transactionSchema), createTransaction);
routes.get("/user/:googleId", getUserTransactionsById);
routes.delete("/:_id", deleteTransactionById);


export default routes;