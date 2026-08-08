import crypto from "crypto";

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT || "chess-academy-salt-12345";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}
