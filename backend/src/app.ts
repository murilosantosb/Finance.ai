require("dotenv").config();

import express from "express";
import conn from "./db/db";
import routes from "./routes/routes";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// DB
conn();

// Route
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
})

