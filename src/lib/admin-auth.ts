import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "technifaso_admin";
const COOKIE_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) throw new Error("ADMIN_COOKIE_SECRET n'est pas configuré.");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function safeStringEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAdminToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + COOKIE_TTL_SECONDS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [expiresAt, signature, extra] = token.split(".");
  if (!expiresAt || !signature || extra) return false;
  if (!/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;

  return safeStringEqual(signature, sign(expiresAt));
}

export const adminCookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: COOKIE_TTL_SECONDS,
};
