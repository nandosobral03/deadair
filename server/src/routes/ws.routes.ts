import express from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../middleware/jwt.middleware';
import WebSocket from 'ws';
var router = express.Router();
const _ews = require('express-ws')(router);
import crypto from 'crypto';



let clients = new Map<string, Set<WebSocket>>();

router.ws('/channel/:channelId', async (ws, req) => {
    let channelId = req.params.channelId;
    let channelViewers = clients.get(channelId);
    if (!channelViewers) {
        channelViewers = new Set<WebSocket>();
        clients.set(channelId, channelViewers);
    }
    channelViewers.add(ws);
    ws.on('message', function (msg) {
        console.log(msg.toString());
        let parsed = JSON.parse(msg.toString());
        console.log(parsed);
        if (!parsed.token || !parsed.message) return;
        let secret = process.env.JWT_SECRET;
        console.log(secret);
        if (!secret) return;
        const payload = jwt.verify(parsed.token, secret) as TokenPayload;
        let channelViewers = clients.get(channelId);
        console.log(channelViewers);
        if (!channelViewers) return;
        let toRemove = new Set<WebSocket>();

        // Get the color from a hash of the username + sub
        let h = crypto.createHash('sha256');
        h.update(payload.username + payload.sub);
        const color = '#' + h.digest('hex').slice(0, 6).toUpperCase();


        for (let viewer of channelViewers) {
            if (viewer.readyState !== WebSocket.OPEN) {
                console.log("REmoving");
                toRemove.add(viewer);
                continue;
            }

            viewer.send(JSON.stringify({ message: parsed.message, username: payload.username, color: color }));
        }

        clients.set(parsed.channel, setDifference(channelViewers, toRemove));
    });
});

function setDifference(a: Set<any>, b: Set<any>) {
    return new Set(Array.from(a).filter(item => !b.has(item)));
}

export default router;
