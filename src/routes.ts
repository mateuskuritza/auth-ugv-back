import { createToken } from "./lib/jwt";
import { db } from "./database";
import { User } from "./database/entities/User";
import { Router } from "express";
import { errorMiddleware } from "./middleware";
import { NotFoundError } from "./errors/not-found-error";
import { BadRequestError } from "./errors/bad-request-error";

const routes = Router();

routes.get("/health", (req, res) => {
    res.json({ status: "ok" });
})

routes.get("/users/:id/jwt", async (req, res) => {
    const userId = Number(req.params.id);

    if(!userId) throw new BadRequestError("Requisição inválida")

    const result = await db.manager.findBy(User, {
        id: userId
    })

    const user = result[0];

    if(!user) throw new NotFoundError("Usuário não encontrado")

    const token = createToken({
        id: user.id,
        username: user.username,
        bald: true
    })

    res.json({ token });
})

routes.post("/users", async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) throw new BadRequestError("Requisição inválida")

    await db.manager.insert(User, {
        username,
        password
    })

    res.sendStatus(201);
})

routes.use(errorMiddleware)

export { routes };