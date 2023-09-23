import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";

export const actions = {
    OAuth2: async ({ }) => {
        const redirectURL = "http://localhost:5173/oauth";
        const client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            redirectURL);

        const url = client.generateAuthUrl({
            access_type: "offline",
            scope: "https://www.googleapis.com/auth/userinfo.profile openid",
        });

        throw redirect(302, url);
    }
}

export let ssr = false;
