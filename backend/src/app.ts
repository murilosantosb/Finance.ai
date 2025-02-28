require("dotenv").config();

import express from "express";
import conn from "./db/db";
import routes from "./routes/routes";
import cors from "cors"

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: ["http://localhost:3000", "http://localhost:3001"]}));

// DB
conn();

// Route
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
})

