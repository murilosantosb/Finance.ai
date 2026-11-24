import mongoose from "mongoose";

const DB_USER = process.env.DB_USER;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;

const conn = async () => {
    const dbConn = await mongoose.connect(
        `mongodb://${DB_USER}:${DB_USER_PASSWORD}@finance-shard-00-00.sktcr.mongodb.net:27017,finance-shard-00-01.sktcr.mongodb.net:27017,finance-shard-00-02.sktcr.mongodb.net:27017/?ssl=true&replicaSet=atlas-wosl1b-shard-0&authSource=admin`
    );

    console.log("Conectou ao banco!");
    return dbConn;
}

export default conn;