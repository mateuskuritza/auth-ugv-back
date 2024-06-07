import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";


export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error("Erro:", err);
  if (err instanceof BadRequestError || err instanceof NotFoundError) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}