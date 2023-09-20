import { NextFunction, Request, Response } from 'express';
import { isGoogleUserModel, isUserModel } from '../models/user.model';
import { createGoogleUserAndGetToken, createUser, login } from '../services/user.service';

const createUserCall = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!isUserModel(req.body)) {
            return res.status(400).json({ error: 'Bad request' });
        }
        const { username, password } = req.body;
        await createUser(username, password);
        const token = await login(username, password);
        return res.status(200).json({ token });

    }
    catch (err) {
        next(err)
    }
}

const loginUserCall = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!isUserModel(req.body)) {
            return res.status(400).json({ error: 'Bad request' });
        }
        const { username, password } = req.body;
        const token = await login(username, password);
        return res.status(200).json({ token });
    }
    catch (err) {
        next(err)
    }
}

const registerGoogleUserCall = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const SERVER_API_KEY = process.env.SERVER_API_KEY;

        if (!SERVER_API_KEY) {
            return res.status(500).json({ error: 'Internal server error, SERVER_API_KEY not set' });
        }

        const api_key = req.headers['x-api-key'];

        if (api_key !== SERVER_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!isGoogleUserModel(req.body)) {
            return res.status(400).json({ error: 'Bad request' });
        }

        const { name, id } = req.body;

        const token = await createGoogleUserAndGetToken(name, id);

        return res.status(200).json({ token });
    }
    catch (err) {
        next(err)
    }
}

export default { createUserCall, loginUserCall, registerGoogleUserCall };