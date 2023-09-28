import { NextFunction, Request, Response } from 'express';
import { db } from '../database/db';
import axios from 'axios';
import dayjs from 'dayjs';
import { TokenPayload } from '../middleware/jwt.middleware';

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers["x-api-key"] !== process.env.API_KEY) {
            const payload: TokenPayload = res.locals.payload;
            const userId = payload?.sub;
            console.log(payload);
            if (!userId) {
                res.status(401).send("Unauthorized");
                return;
            }
            console.log(userId);
            const user = await db.selectFrom('user').select(['id']).where("id", "=", userId).executeTakeFirst();
            if (!user) {
                res.status(401).send("Unauthorized");
                return;
            }
        }
        const image = req.body;
        let data = new FormData();
        let imageblob = new Blob([image], { type: 'image/png' });
        data.append('image', imageblob, 'image.png');
        try {

            let response = await axios.post('https://api.imgur.com/3/upload', data, {
                headers: {
                    'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
                }
            });
            await db.insertInto('image').values({ id: response.data.data.id, url: response.data.data.link, deleteHash: response.data.data.deletehash, createdAt: dayjs().unix() }).execute();
            res.status(200).send(response.data);
        } catch (err) {
            console.log(err);
            throw err;
        }

    } catch (err: any) {
        next(err)
    }
}


export const deleteHangingImages = async () => {
    // timestamp 
    let fiveMinutesAgo = dayjs().subtract(5, 'minute').unix();
    let images = await db.selectFrom('image').leftJoin('video', 'image.url', 'video.thumbnail').select(['deleteHash']).where("video.id", "is", null).where("image.createdAt", "<", fiveMinutesAgo).execute();

    for (let image of images) {
        const response = await axios.delete(`https://api.imgur.com/3/image/${image.deleteHash}`, {
            headers: {
                'Authorization': `Bearer ${process.env.IMGUR_TOKEN}`,
            }
        });
        if (response.status === 200) {
            await db.deleteFrom('image').where("deleteHash", "=", image.deleteHash).execute();
        }
    }
}