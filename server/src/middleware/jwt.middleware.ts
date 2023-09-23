import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export type TokenPayload = {
    username: string;
    sub: string;
    isAdmin?: boolean;
    exp: number;
    iat: number;
}


export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET not set' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
        if (!payload) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (payload.exp < Date.now() / 1000) {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.locals.user = payload;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const jwtMiddlewareOptional = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        next();
        return;
    }

    const token = authHeader.replace('Bearer ', '');

    if (!process.env.JWT_SECRET) {
        next();
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
        if (!payload) {
            next();
            return;
        }
        if (payload.exp < Date.now() / 1000) {
            next();
            return;
        }
        res.locals.user = payload;

        next();
    } catch (error) {
        next();
        return;
    }
}