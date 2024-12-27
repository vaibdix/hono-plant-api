import { Hono } from "hono";
import { MongoClient, ObjectId } from "mongodb";
import { serve } from "@hono/node-server";

const MONGODB_URI =
    "";

const app = new Hono();
const client = new MongoClient(MONGODB_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

const db = client.db("crudDB");
const collection = db.collection("items");

app.get("/plants", async (c) => {
    try {
        const items = await collection.find({}).toArray();
        return c.json(items);
    } catch (err) {
        return c.json({ error: err.message }, 500);
    }
});

app.post("/plants", async (c) => {
    try {
        const newItem = await c.req.json();
        const result = await collection.insertOne(newItem);
        return c.json({ ...newItem, _id: result.insertedId });
    } catch (err) {
        return c.json({ error: err.message }, 500);
    }
});

app.put("/plants/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const updatedItem = await c.req.json();
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedItem }
        );
        return c.json(result);
    } catch (err) {
        return c.json({ error: err.message }, 500);
    }
});

app.delete("/plants/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const result = await collection.deleteOne({
            _id: new ObjectId(id),
        });
        return c.json(result);
    } catch (err) {
        return c.json({ error: err.message }, 500);
    }
});

// Connect to MongoDB and then start the server
const port = 3000;
connectDB().then(() => {
    console.log(`Server is running on http://localhost:${port}`);
    serve({
        fetch: app.fetch,
        port,
    });
});
