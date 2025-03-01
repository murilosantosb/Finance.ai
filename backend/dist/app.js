"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001", "https://finance-ai-five-puce.vercel.app"] }));
// DB
(0, db_1.default)();
// Route
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
