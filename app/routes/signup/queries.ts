import crypto from "node:crypto"
import { db } from "../db";

export async function createAccount(email: string, password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");
    const userId = db.length;
    db.push({
        email,
        userId,
        password: {
            hash,
            salt
        }
    })
    return {
        userId
    }
}

export async function accountExists(email: string) {
    return Boolean(db.find(user => user.email === email));
}