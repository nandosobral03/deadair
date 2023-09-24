import { redirect } from "@sveltejs/kit";

export async function POST({ params, request, cookies }) {    // get token from the request form "credential"
    cookies.set("token", "");
    throw redirect(302, "http://localhost:5173/browse");
}
