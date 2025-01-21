import express from "express";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Rotas exemplo
app.get("/", (req, res) => {
    res.send("Olá, mundo!");
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})