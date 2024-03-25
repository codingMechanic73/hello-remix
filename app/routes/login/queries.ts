import crypto from "node:crypto"
import { db } from "../db";


export async function loginUser(email: string, password: string) {
  const user = db.find(user => user.email === email);
  if (!user || !user.password) {
    return false;
  }

  const hash = crypto.pbkdf2Sync(password, user.password.salt, 1000, 64, "sha256"
  ).toString("hex");

  if (hash !== user.password.hash) {
    return false;
  }

  return user.userId;
}
