import { PUBLIC_API_URL } from "$env/static/public"
import type { TokenPayload } from "../+layout.server";
import axios from "axios"
import jwt from "jsonwebtoken"
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    const token = cookies.get('token');
    if (!token) {
        throw redirect(302, '/login')
    }
    const payload = jwt.decode(token) as TokenPayload;
    if (!payload.isAdmin) {
        throw redirect(302, '/browse')
    }

    const channels = await axios.get(`${PUBLIC_API_URL}/channels`)
    return {
        channels: channels.data,
    }
}