import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { db } from "../../database";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { createToken } from "../utils/user-jwt.util";
import config from '../../config';
import { User } from "../models/entities/user.entity";
import { CreateUserDto } from "../models/dtos/user.dto";
import { JwtPayload } from "../models/interfaces/jwt-payload.interface";


export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password }: CreateUserDto = req.body;
    const user = await db.manager.findOneBy(User, { username });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Credenciais inválidas");
    }

    const tokenPayload: JwtPayload = {
      id: user.id,
      username: user.username,
      bald: true
    };

    const token = createToken(tokenPayload);

    res.cookie('token', token, { httpOnly: true });
    res.json({ token });

  } catch (error) {
    console.error("Erro ao gerar token JWT:", error);
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password }: CreateUserDto = req.body;

    const existingUser = await db.manager.findOneBy(User, { username });
    if (existingUser) {
      throw new BadRequestError("Nome de usuário já está em uso");
    }

    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
    await db.manager.insert(User, { username, password: hashedPassword });

    res.sendStatus(201);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    next(error);
  }
}
