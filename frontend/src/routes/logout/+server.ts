import { PUBLIC_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

export async function POST({ params, request, cookies }) {    // get token from the request form "credential"
    cookies.set("token", "");
    throw redirect(302, `${PUBLIC_URL}/browse`);
}
