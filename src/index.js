import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { connectDB, getCollection } from "./config/database.js";
import { setupPlantRoutes } from "./routes/plantRoutes.js";
import { PlantService } from "./services/plantService.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = new Hono();

// Global error handler
app.onError(errorHandler);

async function startServer() {
    const db = await connectDB();
    const plantsCollection = getCollection(db, "items");
    const plantService = new PlantService(plantsCollection);

    // Routes
    app.route("/plants", setupPlantRoutes(plantService));

    const port = process.env.PORT || 3000;
    console.log(`Server is running on http://localhost:${port}`);
    
    serve({
        fetch: app.fetch,
        port,
    });
}

startServer().catch(console.error);