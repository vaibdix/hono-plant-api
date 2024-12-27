import { Hono } from "hono";

export function setupPlantRoutes(plantService) {
    const router = new Hono();

    router.get("/", async (c) => {
        const plants = await plantService.getAllPlants();
        return c.json(plants);
    });

    router.post("/", async (c) => {
        const newPlant = await c.req.json();
        const result = await plantService.createPlant(newPlant);
        return c.json(result, 201);
    });

    router.put("/:id", async (c) => {
        const id = c.req.param("id");
        const updatedPlant = await c.req.json();
        const result = await plantService.updatePlant(id, updatedPlant);
        return c.json(result);
    });

    router.delete("/:id", async (c) => {
        const id = c.req.param("id");
        const result = await plantService.deletePlant(id);
        return c.json(result);
    });

    return router;
}