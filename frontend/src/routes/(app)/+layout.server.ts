import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';

export type TokenPayload = {
    username: string;
    sub: string;
    isAdmin?: boolean;
    exp: number;
    iat: number;
}
export function load({ route, cookies }) {
    const token = cookies.get('token');
    if (token) {
        const payload = jwt.decode(token) as TokenPayload;
        return {
            route: route.id,
            payload,
            isAdmin: payload.isAdmin || false,
            token,
        };
    }
    return {
        route: route.id,
    };
}