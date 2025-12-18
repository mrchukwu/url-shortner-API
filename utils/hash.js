import { randomBytes, createHmac } from "node:crypto";

export function hashPasswordWithSalt(password, userSalt = undefined) {
  const salt = userSalt ?? randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha512", salt)
    .update(password)
    .digest("hex");
  return { salt, passsword: hashedPassword };
}
