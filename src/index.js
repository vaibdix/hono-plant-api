import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { connectDB, getCollection } from "./config/database.js";
import { setupPlantRoutes } from "./routes/plantRoutes.js";
import { PlantService } from "./services/plantService.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { corsMiddleware } from "./middleware/cors.js";
import { swaggerConfig } from "./config/swagger.js";

const app = new Hono();

// Middleware
app.use('*', cors(corsMiddleware));
app.use('*', rateLimit(100, 60000)); // 100 requests per minute
app.onError(errorHandler);

// Swagger documentation
app.get('/swagger', swaggerUI({ url: '/swagger.json' }));
app.get('/swagger.json', (c) => {
  return c.json(swaggerConfig);
});

async function startServer() {
    const db = await connectDB();
    const plantsCollection = getCollection(db, "items");
    const plantService = new PlantService(plantsCollection);

    // Routes
    app.route("/plants", setupPlantRoutes(plantService));

    const port = process.env.PORT || 3000;
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`API documentation available at http://localhost:${port}/swagger`);
    
    serve({
        fetch: app.fetch,
        port,
    });
}

startServer().catch(console.error);