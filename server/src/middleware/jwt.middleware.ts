import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export type TokenPayload = {
    username: string;
    sub: string;
    isAdmin?: boolean;
    exp: number;
    iat: number;
}

const isTokenPayload = (payload: any): payload is TokenPayload => {
    return payload.username && payload.sub && payload.exp && payload.iat;
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw { status: 401, message: 'No token provided' };
    }

    const token = authHeader.replace('Bearer ', '');

    if (!process.env.JWT_SECRET) {
        throw { status: 500, message: 'JWT_SECRET not set' };
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
        if (!payload) {
            throw { status: 401, message: 'Invalid token' };
        }
        if (payload.exp < Date.now() / 1000) {
            throw { status: 401, message: 'Token expired' };
        }
        if (!isTokenPayload(payload)) {
            throw { status: 401, message: 'Invalid token' };
        }

        res.locals.user = payload;

        next();
    } catch (error) {
        return next(error);
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