import { Router } from "express";
import { createToken } from "./lib/jwt";
import { db } from "./database";
import { User } from "./database/entities/User";

const routes = Router();

routes.get("/health", (req, res) => {
    res.json({ status: "ok" });
})



routes.get("/jwt", async (req, res) => {
    const result = await db.manager.find(User)
    console.log({ result })
    const token = createToken({
        name: "Luan",
        bald: true
    })
    res.json({ token, result });
})




export { routes };