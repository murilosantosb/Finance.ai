import express from "express"

const routes = express()

//Routes
import userRoutes from "./userRoute"


routes.use("/api/users", userRoutes)


routes.get("/", (req,res) => {
    res.send("API Working!")
})


export default routes;