import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { connectDB, getCollection } from "./config/database.js";
import { setupPlantRoutes } from "./routes/plantRoutes.js";
import { setupUserRoutes } from "./routes/userRoutes.js";
import { PlantService } from "./services/plantService.js";
import { UserService } from "./services/userService.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { corsMiddleware } from "./middleware/cors.js";
import { securityHeaders } from "./middleware/security.js";
import { swaggerConfig } from "./config/swagger.js";

const app = new Hono();

// Middleware - Apply CORS first
app.use('*', cors(corsMiddleware));
app.options('*', (c) => {
  // Handle preflight requests
  return c.json({}, 204);
});

// Other middleware
app.use('*', rateLimit(100, 60000));
app.use('*', securityHeaders);
app.onError(errorHandler);

// Swagger documentation
app.get('/swagger', swaggerUI({ url: '/swagger.json' }));
app.get('/swagger.json', (c) => {
    return c.json(swaggerConfig);
});

async function startServer() {
    try {
        const db = await connectDB();
        const plantsCollection = getCollection(db, "items");
        const usersCollection = getCollection(db, "users");

        const plantService = new PlantService(plantsCollection);
        const userService = new UserService(usersCollection);

        // Routes
        app.route("/plants", setupPlantRoutes(plantService));
        app.route("/users", setupUserRoutes(userService));

        const port = process.env.PORT || 3000;

        serve({
            fetch: app.fetch,
            port,
        });

        console.log(`Server is running on http://localhost:${port}`);
        console.log(`API documentation available at http://localhost:${port}/swagger`);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();