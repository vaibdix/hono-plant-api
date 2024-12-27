import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";

const client = new MongoClient(MONGODB_URI);

export async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("crudDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

export function getCollection(db, name) {
    return db.collection(name);
}