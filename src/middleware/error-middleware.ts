
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";

export const errorMiddleware = (error: Error | ApiError, _req: Request, res:Response, next: NextFunction) => {
    console.log({ error })

    if(error instanceof ApiError){
        res.status(error.statusCode).json({ error: error.message })
        return next();
    }

    res.status(500).json({ error: error.message })
    next();
}
