import { httpErrorOrDefault } from "../utils/httperror";
import { Request, Response, NextFunction } from "express";
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the error (you can customize this part)
    console.error(err.stack);
    let error = httpErrorOrDefault(err);
    res.status(error.status).send(error);
};