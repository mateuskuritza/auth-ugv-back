import { createToken } from "./lib/jwt";
import { db } from "./database";
import { User } from "./database/entities/User";
import { Router } from "express";
import { errorMiddleware } from "./middleware";
import { NotFoundError } from "./errors/not-found-error";
import { BadRequestError } from "./errors/bad-request-error";


const bcrypt = require('bcrypt');
const routes = Router();


routes.get("/health", (req, res) => {
    res.json({ status: "ok" });
})


routes.get("/users/:id/jwt", async (req, res) => {
    try {
        const userId = Number(req.params.id);

        if (!userId) {
            throw new BadRequestError("Requisição inválida");
        }

        const result = await db.manager.findBy(User, { id: userId });
        const user = result[0];

        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }

        const token = createToken({
            id: user.id,
            username: user.username,
            bald: true
        });

        res.json({ token });
    } catch (error) {
        console.error("Erro ao gerar token JWT:", error);
        if (error instanceof BadRequestError || error instanceof NotFoundError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
});


routes.post("/users", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new BadRequestError("Requisição inválida");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.manager.insert(User, {
            username,
            password: hashedPassword
        });

        res.sendStatus(201);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

routes.use(errorMiddleware)


export { routes };