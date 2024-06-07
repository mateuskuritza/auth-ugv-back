import express from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import config from "../../config";
import { createUser, login } from "../controllers/user.controller";
import rateLimit from "express-rate-limit";

const routes = express.Router();

const limiter = rateLimit(config.rateLimit);
routes.use(limiter);

routes.post("/users/login", login);
routes.post("/users", validationMiddleware, createUser);

export default routes;
