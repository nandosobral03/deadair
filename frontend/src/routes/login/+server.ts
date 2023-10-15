import { redirect } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
    const body = await request.json();
    const token = body.token;
    cookies.set("token", token);
    throw redirect(302, "http://localhost:5173/browse");
}
