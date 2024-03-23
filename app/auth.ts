import { createCookie } from "@remix-run/node";

let secret = process.env.COOKIE_SECRET

if (!secret) {
    console.warn("No COOKIE_SECRET set, the app is insecure");
    secret = "default-secret"
}

export async function createAccount(email: string, password: string) {
    return {
        userId: 1
    }
}

export const userCookie = createCookie("auth", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [secret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
})