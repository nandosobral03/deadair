import { NextFunction, Request, Response } from 'express';
import { db } from '../database/db';
import axios from 'axios';

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers["x-api-key"] !== process.env.API_KEY) {
            const userId = req.headers["user-id"] as string;
            if (!userId) {
                res.status(401).send("Unauthorized");
                return;
            }
            const user = await db.selectFrom('user').select(['id']).where("id", "=", userId).executeTakeFirst();
            if (!user) {
                res.status(401).send("Unauthorized");
                return;
            }
        }


        const image = req.body;
        console.log(image);
        let data = new FormData();
        let imageblob = new Blob([image], { type: 'image/png' });
        data.append('image', imageblob, 'image.png');

        let response = await axios.post('https://api.imgur.com/3/upload', data, {
            headers: {
                'Authorization': `Bearer ${process.env.IMGUR_TOKEN}`,
            }
        });

        res.status(200).send(response.data);
    } catch (err: any) {
        next(err)
    }
}