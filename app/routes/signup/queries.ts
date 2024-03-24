import crypto from "node:crypto"

type UserType = {
    email: string,
    userId: number,
    password: {
        create: {
            hash: string,
            salt: string
        }
    }
}

const db: UserType[] = [];

export async function createAccount(email: string, password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");
    const userId = db.length;
    db.push({
        email, 
        userId,
        password: {
            create: {
                hash,
                salt
            }
        }
    })
    return {
        userId
    }
}

export async function accountExists(email: string) {
    return Boolean(db.find(user => user.email === email));
}