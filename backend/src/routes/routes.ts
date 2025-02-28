import express from "express"

const routes = express()

//Routes
import userRoutes from "./userRoute";
import transactionRoutes from "./transactionRoute";
import categoryRoutes from "./categoryRoute";

routes.use("/api/users", userRoutes);
routes.use("/api/transaction", transactionRoutes);
routes.use("/api/category", categoryRoutes);


routes.get("/", (req,res) => {
    res.send("API Working!");
})


export default routes;