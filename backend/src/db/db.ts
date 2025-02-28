import mongoose from "mongoose";

const DB_USER = process.env.DB_USER;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;

const conn = async () => {
    const dbConn = await mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@finance.sktcr.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=finance`
    );

    console.log("Conectou ao banco!");
    return dbConn;
}

export default conn;