// import { Hono } from "hono";
// import { validateUser } from "../middleware/validation.js";

// export function setupUserRoutes(userService) {
//     const router = new Hono();

//     router.get("/", async (c) => {
//         const users = await userService.getAllUsers();
//         return c.json(users);
//     });

//     router.post("/", async (c) => {
//         const newUser = await c.req.json();
//         const errors = validateUser(newUser);

//         if (errors.length > 0) {
//             return c.json({ errors }, 400);
//         }

//         try {
//             const result = await userService.createUser(newUser);
//             return c.json(result, 201);
//         } catch (error) {
//             return c.json({ error: error.message }, 400);
//         }
//     });

//     router.put("/:id", async (c) => {
//         const id = c.req.param("id");
//         const updatedUser = await c.req.json();
//         const errors = validateUser(updatedUser);

//         if (errors.length > 0) {
//             return c.json({ errors }, 400);
//         }

//         try {
//             const result = await userService.updateUser(id, updatedUser);
//             return c.json(result);
//         } catch (error) {
//             return c.json({ error: error.message }, 400);
//         }
//     });

//     router.delete("/:id", async (c) => {
//         const id = c.req.param("id");
//         try {
//             const result = await userService.deleteUser(id);
//             return c.json(result);
//         } catch (error) {
//             return c.json({ error: error.message }, 404);
//         }
//     });

//     return router;
// }






import { Hono } from "hono";
import { validateUser } from "../middleware/validation.js";

export function setupUserRoutes(userService) {
    const router = new Hono();

    router.get("/", async (c) => {
        const users = await userService.getAllUsers();
        return c.json(users);
    });

    router.post("/", async (c) => {
        const newUser = await c.req.json();
        const errors = validateUser(newUser);

        if (errors.length > 0) {
            return c.json({ errors }, 400);
        }

        try {
            const result = await userService.createUser(newUser);
            return c.json(result, 201);
        } catch (error) {
            return c.json({ error: error.message }, 400);
        }
    });

    router.put("/:id", async (c) => {
        const id = c.req.param("id");
        const updatedUser = await c.req.json();
        const errors = validateUser(updatedUser);

        if (errors.length > 0) {
            return c.json({ errors }, 400);
        }

        try {
            const result = await userService.updateUser(id, updatedUser);
            return c.json(result);
        } catch (error) {
            return c.json({ error: error.message }, 400);
        }
    });

    router.delete("/:id", async (c) => {
        const id = c.req.param("id");
        try {
            const result = await userService.deleteUser(id);
            return c.json(result);
        } catch (error) {
            return c.json({ error: error.message }, 404);
        }
    });

    return router;
}