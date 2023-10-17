import { GOOGLE_CLIENT_ID } from "$env/static/private";
import { PUBLIC_API_URL, PUBLIC_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

export async function POST({ params, request, cookies }) {    // get token from the request form "credential"
    const body = await request.formData(); // or request.json(), etc
    const credential = body.get("credential")!.toString();
    const g_csrf_token = body.get("g_csrf_token")!.toString();
    const csrf_token_cookie = request.headers.get("cookie")!.split(";").find((c) => c.trim().startsWith("g_csrf_token"))!.split("=")[1];

    if (!csrf_token_cookie) {
        throw new Error("No CSRF token in Cookie.");
    }
    if (!g_csrf_token) {
        throw new Error("No credential in post body.");
    }

    if (csrf_token_cookie !== g_csrf_token) {
        throw new Error("Failed to verify double submit cookie.");
    }

    console.log("credential", credential);

    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload()!;


    const { data } = await axios.post(`${PUBLIC_API_URL}/oauth/google`, {
        id: payload.sub,
        name: payload.name,
    },
        {
            headers: {
                "x-api-key": 123
            }
        }

    );
    const { token } = data;
    cookies.set("token", token);
    // Set token cookie from server data;

    throw redirect(302, `${PUBLIC_URL}/browse`);
}
