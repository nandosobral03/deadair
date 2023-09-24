import { httpErrorOrDefault } from "../utils/httperror";
import { Request, Response, NextFunction } from "express";
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    let error = httpErrorOrDefault(err);
    res.status(error.status).send(error);
    next();
};